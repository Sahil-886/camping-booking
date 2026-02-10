import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const twilioWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER;

let client: twilio.Twilio | null = null;

if (accountSid && authToken) {
    client = twilio(accountSid, authToken);
}

export async function sendBookingSMS(phone: string, bookingId: string, campTitle: string, bookingDate: string) {
    if (!client || !twilioPhone) {
        console.log('Twilio not configured, skipping SMS');
        return;
    }

    try {
        await client.messages.create({
            body: `Your camping booking is confirmed! 🏕️\n\nBooking ID: ${bookingId}\nCamp: ${campTitle}\nDate: ${bookingDate}\n\nTrack: ${process.env.NEXTAUTH_URL}/track-booking?id=${bookingId}\n\n- WeekendCamps`,
            from: twilioPhone,
            to: phone,
        });
    } catch (error) {
        console.error('SMS send error:', error);
    }
}

export async function sendBookingWhatsApp(phone: string, bookingId: string, campTitle: string, bookingDate: string) {
    if (!client || !twilioWhatsApp) {
        console.log('Twilio WhatsApp not configured, skipping WhatsApp message');
        return;
    }

    try {
        // Format phone number for WhatsApp (must include country code)
        const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

        await client.messages.create({
            body: `🎉 *Booking Confirmed!*\n\n*Booking ID:* ${bookingId}\n*Camp:* ${campTitle}\n*Date:* ${bookingDate}\n\nYour camping adventure is all set! We'll send you a detailed itinerary 48 hours before your trip.\n\n📞 Contact: ${process.env.NEXT_PUBLIC_CONTACT_PHONE}\n\n- WeekendCamps Team`,
            from: twilioWhatsApp,
            to: `whatsapp:${formattedPhone}`,
        });
    } catch (error) {
        console.error('WhatsApp send error:', error);
    }
}
