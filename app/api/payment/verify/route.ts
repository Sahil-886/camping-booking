import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email';
import Camp from '@/lib/models/Camp';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

        if (!bookingId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest('hex');

        if (generatedSignature !== razorpaySignature) {
            return NextResponse.json(
                { success: false, error: 'Invalid payment signature' },
                { status: 400 }
            );
        }

        // Update booking
        const booking = await Booking.findOneAndUpdate(
            { bookingId },
            {
                paymentStatus: 'completed',
                status: 'confirmed',
                razorpayPaymentId,
                razorpaySignature,
                paymentDate: new Date(),
                paidAmount: booking.totalAmount,
            },
            { new: true }
        ).populate('camp');

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        // Send confirmation emails
        try {
            const camp = await Camp.findById(booking.camp);

            await sendBookingConfirmation({
                bookingId: booking.bookingId,
                customerName: booking.customer.name,
                customerEmail: booking.customer.email,
                campTitle: camp?.title || 'Camp',
                bookingDate: booking.bookingDate.toLocaleDateString(),
                adults: booking.persons.adults,
                children: booking.persons.children,
                totalAmount: booking.totalAmount,
            });

            await sendAdminNotification({
                bookingId: booking.bookingId,
                customerName: booking.customer.name,
                customerEmail: booking.customer.email,
                campTitle: camp?.title || 'Camp',
                bookingDate: booking.bookingDate.toLocaleDateString(),
                adults: booking.persons.adults,
                children: booking.persons.children,
                totalAmount: booking.totalAmount,
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the payment verification if email fails
        }

        return NextResponse.json({
            success: true,
            message: 'Payment verified successfully',
            booking,
        });
    } catch (error: any) {
        console.error('Verify payment error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Payment verification failed' },
            { status: 500 }
        );
    }
}
