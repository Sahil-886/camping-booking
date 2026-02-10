import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await dbConnect();

        const blog = await Blog.findOne({ slug: params.slug, published: true });

        if (!blog) {
            return NextResponse.json(
                { success: false, error: 'Blog post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: blog,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
