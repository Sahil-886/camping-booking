import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export interface BookingEmailData {
    bookingId: string;
    customerName: string;
    customerEmail: string;
    campTitle: string;
    bookingDate: string;
    adults: number;
    children: number;
    totalAmount: number;
}

export async function sendBookingConfirmation(data: BookingEmailData) {
    const { bookingId, customerName, customerEmail, campTitle, bookingDate, adults, children, totalAmount } = data;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: customerEmail,
        subject: `Booking Confirmation - ${bookingId}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #16a34a, #22c55e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-label { font-weight: bold; color: #666; }
          .total { font-size: 24px; color: #16a34a; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .btn { display: inline-block; padding: 12px 30px; background: #16a34a; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
            <p>Your camping adventure awaits</p>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            <p>Thank you for booking with WeekendCamps! Your booking has been confirmed.</p>
            
            <div class="booking-details">
              <h2>Booking Details</h2>
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span>${bookingId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Camp:</span>
                <span>${campTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span>${bookingDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Adults:</span>
                <span>${adults}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Children:</span>
                <span>${children}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Total Amount:</span>
                <span class="total">₹${totalAmount}</span>
              </div>
            </div>

            <p><strong>What's Next?</strong></p>
            <ul>
              <li>Save your booking ID: <strong>${bookingId}</strong></li>
              <li>You'll receive a detailed itinerary 48 hours before your trip</li>
              <li>Check your email for the trip checklist PDF</li>
            </ul>

            <center>
              <a href="${process.env.NEXTAUTH_URL}/track-booking?id=${bookingId}" class="btn">Track Your Booking</a>
            </center>

            <p>For any queries, contact us at:</p>
            <p>📞 ${process.env.NEXT_PUBLIC_CONTACT_PHONE}<br>
            📧 ${process.env.ADMIN_EMAIL}</p>
          </div>
          <div class="footer">
            <p>© 2026 WeekendCamps. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);
}

export async function sendAdminNotification(data: BookingEmailData) {
    const { bookingId, customerName, customerEmail, campTitle, bookingDate, adults, children, totalAmount } = data;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Booking Received - ${bookingId}`,
        html: `
      <h2>New Booking Received</h2>
      <p><strong>Booking ID:</strong> ${bookingId}</p>
      <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
      <p><strong>Camp:</strong> ${campTitle}</p>
      <p><strong>Date:</strong> ${bookingDate}</p>
      <p><strong>Guests:</strong> ${adults} adults, ${children} children</p>
      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
      <p><a href="${process.env.NEXTAUTH_URL}/admin/bookings">View in Admin Panel</a></p>
    `,
    };

    await transporter.sendMail(mailOptions);
}

export async function sendContactNotification(name: string, email: string, subject: string, message: string) {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Inquiry: ${subject}`,
        html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}
