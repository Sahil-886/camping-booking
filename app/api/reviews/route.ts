import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import Camp from '@/lib/models/Camp';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { campId, customerName, email, rating, comment } = body;

        // Validate required fields
        if (!campId || !customerName || !email || !rating || !comment) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate rating
        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, error: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        // Verify camp exists
        const camp = await Camp.findById(campId);
        if (!camp) {
            return NextResponse.json(
                { success: false, error: 'Camp not found' },
                { status: 404 }
            );
        }

        // Create review (pending approval)
        const review = await Review.create({
            camp: campId,
            customerName,
            email,
            rating,
            comment,
            approved: false,
        });

        return NextResponse.json({
            success: true,
            message: 'Thank you for your review! It will be published after moderation.',
            data: review,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
