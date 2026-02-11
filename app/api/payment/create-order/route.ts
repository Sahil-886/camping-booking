import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { bookingId, amount } = body;

        if (!bookingId || !amount) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify booking exists
        const booking = await Booking.findOne({ bookingId });
        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        // Create Razorpay order
        const options = {
            amount: Math.round(amount * 100), // Amount in paise
            currency: 'INR',
            receipt: bookingId,
            notes: {
                bookingId,
                campId: booking.camp.toString(),
            },
        };

        const order = await razorpay.orders.create(options);

        // Update booking with Razorpay order ID
        await Booking.findOneAndUpdate(
            { bookingId },
            { razorpayOrderId: order.id }
        );

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error: any) {
        console.error('Create order error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}
