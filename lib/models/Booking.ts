import mongoose, { Schema, model, models } from 'mongoose';

export interface IBooking {
    _id: string;
    bookingId: string;
    camp: mongoose.Types.ObjectId;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    bookingDate: Date;
    persons: {
        adults: number;
        children: number;
    };
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentMethod?: string;
    paymentId?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    paidAmount?: number;
    paymentDate?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true,
        },
        camp: {
            type: Schema.Types.ObjectId,
            ref: 'Camp',
            required: true,
        },
        customer: {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        },
        bookingDate: {
            type: Date,
            required: true,
        },
        persons: {
            adults: {
                type: Number,
                required: true,
                min: 1,
            },
            children: {
                type: Number,
                default: 0,
                min: 0,
            },
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending',
        },
        paymentMethod: String,
        paymentId: String,
        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,
        paidAmount: Number,
        paymentDate: Date,
        notes: String,
    },
    {
        timestamps: true,
    }
);

BookingSchema.index({ bookingId: 1 });
BookingSchema.index({ 'customer.email': 1 });
BookingSchema.index({ bookingDate: 1 });
BookingSchema.index({ status: 1 });

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
