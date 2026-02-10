import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Camp from '@/lib/models/Camp';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const locationType = searchParams.get('location');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const tags = searchParams.get('tags');

        let query: any = {};

        if (locationType) {
            query.locationType = locationType;
        }

        if (minPrice || maxPrice) {
            query['price.adult'] = {};
            if (minPrice) query['price.adult'].$gte = parseInt(minPrice);
            if (maxPrice) query['price.adult'].$lte = parseInt(maxPrice);
        }

        if (tags) {
            query.tags = { $in: tags.split(',') };
        }

        const camps = await Camp.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: camps,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
