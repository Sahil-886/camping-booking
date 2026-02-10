import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import Camp from '@/lib/models/Camp';
import { generateBookingId, formatDate } from '@/lib/utils';
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email';
import { sendBookingWhatsApp } from '@/lib/sms';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { campId, customer, bookingDate, persons } = body;

        // Validate required fields
        if (!campId || !customer || !bookingDate || !persons) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get camp details
        const camp = await Camp.findById(campId);
        if (!camp) {
            return NextResponse.json(
                { success: false, error: 'Camp not found' },
                { status: 404 }
            );
        }

        // Calculate total amount
        const totalAmount =
            persons.adults * camp.price.adult + persons.children * camp.price.child;

        // Generate unique booking ID
        const bookingId = generateBookingId();

        // Create booking
        const booking = await Booking.create({
            bookingId,
            camp: campId,
            customer,
            bookingDate: new Date(bookingDate),
            persons,
            totalAmount,
            status: 'pending',
            paymentStatus: 'pending',
        });

        // Send confirmation email
        try {
            await sendBookingConfirmation({
                bookingId,
                customerName: customer.name,
                customerEmail: customer.email,
                campTitle: camp.title,
                bookingDate: formatDate(bookingDate),
                adults: persons.adults,
                children: persons.children,
                totalAmount,
            });

            // Send admin notification
            await sendAdminNotification({
                bookingId,
                customerName: customer.name,
                customerEmail: customer.email,
                campTitle: camp.title,
                bookingDate: formatDate(bookingDate),
                adults: persons.adults,
                children: persons.children,
                totalAmount,
            });

            // Send WhatsApp notification (optional, won't fail if not configured)
            await sendBookingWhatsApp(
                customer.phone,
                bookingId,
                camp.title,
                formatDate(bookingDate)
            );
        } catch (emailError) {
            console.error('Email/SMS error:', emailError);
            // Continue even if email fails
        }

        return NextResponse.json({
            success: true,
            data: {
                bookingId,
                booking,
            },
        });
    } catch (error: any) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
