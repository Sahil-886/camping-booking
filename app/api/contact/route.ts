import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !phone || !subject || !message) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create contact inquiry
        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
            status: 'new',
        });

        // Send notification to admin
        try {
            await sendContactNotification(name, email, subject, message);
        } catch (emailError) {
            console.error('Email error:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: 'Your message has been sent successfully!',
            data: contact,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
