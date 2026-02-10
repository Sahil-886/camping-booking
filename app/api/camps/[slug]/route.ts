import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Camp from '@/lib/models/Camp';
import Review from '@/lib/models/Review';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await dbConnect();

        const camp = await Camp.findOne({ slug: params.slug });

        if (!camp) {
            return NextResponse.json(
                { success: false, error: 'Camp not found' },
                { status: 404 }
            );
        }

        // Get approved reviews for this camp
        const reviews = await Review.find({ camp: camp._id, approved: true })
            .sort({ createdAt: -1 })
            .limit(10);

        return NextResponse.json({
            success: true,
            data: {
                camp,
                reviews,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
