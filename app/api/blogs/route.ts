import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const tag = searchParams.get('tag');

        let query: any = { published: true };

        if (tag) {
            query.tags = tag;
        }

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .select('-content'); // Exclude full content for listing

        return NextResponse.json({
            success: true,
            data: blogs,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
