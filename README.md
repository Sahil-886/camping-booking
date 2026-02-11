# WeekendCamps - Full-Stack Booking Website

A complete, production-ready travel and camping booking platform built with Next.js 14, MongoDB, and TypeScript.

## 🚀 Features

### ✅ Completed Backend
- **Database Models**: Camp, Booking, Blog, Contact, Review, User
- **REST APIs**: 9 fully functional endpoints
  - Camps listing with filters
  - Single camp details with reviews
  - Booking creation with auto-generated ID
  - Booking tracking
  - Contact form submission
  - Blog listing and single post
  - Review submission with moderation
  - Weather API integration
- **Email Service**: Nodemailer with booking confirmations
- **SMS/WhatsApp**: Twilio integration
- **PDF Generation**: Invoice and checklist PDFs
- **Utility Functions**: Booking ID generation, formatting, validation

### 🔨 To Be Completed (Frontend Pages)
- Homepage with hero, featured camps, stats
- Camps listing page with filters
- Camp detail page (dynamic)
- Booking form page
- Booking confirmation page
- Blog listing and detail pages
- Contact page
- About, Privacy, Terms pages
- Booking tracker page
- Admin panel (dashboard, bookings, camps, blogs management)

## 📋 Prerequisites

1. **Node.js** 18+ installed
2. **MongoDB** database (MongoDB Atlas recommended)
3. **Email Service** (Gmail or SendGrid)
4. **Optional**: Twilio account for WhatsApp/SMS
5. **Optional**: OpenWeatherMap API key
6. **Optional**: Google Maps API key

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd camping-booking
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Required
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/camping-booking

# Required for admin panel
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key

# Required for emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@weekendcamps.com

# Optional (for WhatsApp/SMS)
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# Optional (for weather widget)
OPENWEATHER_API_KEY=your-api-key

# Optional (for maps)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key

# Contact info
NEXT_PUBLIC_CONTACT_PHONE=+918530160937
NEXT_PUBLIC_WHATSAPP_NUMBER=918530160937
```

### 3. Seed Database (Optional)

Create a seed script to populate initial camp data:

```bash
node scripts/seed.js
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
camping-booking/
├── app/
│   ├── api/                    # REST API routes
│   │   ├── camps/             # ✅ Camps API
│   │   ├── bookings/          # ✅ Bookings API
│   │   ├── contact/           # ✅ Contact API
│   │   ├── blogs/             # ✅ Blogs API
│   │   ├── reviews/           # ✅ Reviews API
│   │   └── weather/           # ✅ Weather API
│   ├── (pages)/               # 🔨 Frontend pages (to be built)
│   ├── layout.tsx             # ✅ Root layout
│   ├── globals.css            # ✅ Global styles
│   └── not-found.tsx          # ✅ 404 page
├── lib/
│   ├── mongodb.ts             # ✅ Database connection
│   ├── models/                # ✅ Mongoose models
│   │   ├── Camp.ts
│   │   ├── Booking.ts
│   │   ├── Blog.ts
│   │   ├── Contact.ts
│   │   ├── Review.ts
│   │   └── User.ts
│   ├── email.ts               # ✅ Email service
│   ├── sms.ts                 # ✅ SMS/WhatsApp service
│   ├── pdf.ts                 # ✅ PDF generation
│   └── utils.ts               # ✅ Helper functions
├── components/                # 🔨 React components (to be built)
├── public/                    # Static assets
├── .env.example               # ✅ Environment template
├── next.config.js             # ✅ Next.js config
├── tailwind.config.js         # ✅ Tailwind config
├── tsconfig.json              # ✅ TypeScript config
└── package.json               # ✅ Dependencies

✅ = Completed
🔨 = To be built
```

## 🔌 API Endpoints

### Public APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/camps` | List all camps with filters |
| GET | `/api/camps/[slug]` | Get single camp details |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings/[id]` | Track booking by ID |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/blogs` | List published blogs |
| GET | `/api/blogs/[slug]` | Get single blog post |
| POST | `/api/reviews` | Submit review |
| GET | `/api/weather?location=Lonavala` | Get weather data |

### Example API Calls

**Get all camps:**
```bash
curl http://localhost:3000/api/camps
```

**Create booking:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "campId": "camp_id_here",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+919876543210"
    },
    "bookingDate": "2026-03-15",
    "persons": {
      "adults": 2,
      "children": 1
    }
  }'
```

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication in your Google Account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated password
3. Use this password in `SMTP_PASS` environment variable

## 📱 WhatsApp/SMS Setup (Optional)

1. Sign up for Twilio: https://www.twilio.com/
2. Get your Account SID and Auth Token
3. Get a phone number for SMS
4. Enable WhatsApp sandbox for testing
5. Add credentials to `.env.local`

## 🌤️ Weather API Setup (Optional)

1. Sign up at https://openweathermap.org/
2. Get your free API key
3. Add to `OPENWEATHER_API_KEY` in `.env.local`

## 🗺️ Google Maps Setup (Optional)

1. Go to Google Cloud Console
2. Enable Maps JavaScript API
3. Create API key
4. Add to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## 🎨 Building Frontend Pages

The backend is complete. To finish the project, create these pages:

### Priority 1 (Core Functionality)
1. **Homepage** (`app/page.tsx`)
   - Hero section
   - Featured camps grid
   - Stats section
   - Testimonials
   - CTA section

2. **Camps Listing** (`app/camps/page.tsx`)
   - Fetch from `/api/camps`
   - Filter sidebar (location, price)
   - Camp cards grid

3. **Camp Detail** (`app/camps/[slug]/page.tsx`)
   - Fetch from `/api/camps/[slug]`
   - Image gallery
   - Booking form
   - Inclusions, itinerary, FAQs
   - Reviews section

4. **Booking Page** (`app/booking/page.tsx`)
   - Form with validation
   - Price calculator
   - POST to `/api/bookings`
   - Redirect to confirmation

5. **Booking Confirmation** (`app/booking/confirmation/page.tsx`)
   - Show booking details
   - Download invoice button
   - Track booking link

### Priority 2 (Content Pages)
6. Contact page
7. Blog listing and detail pages
8. About, Privacy, Terms pages
9. Booking tracker page

### Priority 3 (Admin Panel)
10. Admin authentication
11. Dashboard with stats
12. Bookings management
13. Camps CRUD
14. Blog management

## 🧩 Reusable Components to Build

Create these in `components/`:

- `Navbar.tsx` - Navigation bar
- `Footer.tsx` - Footer section
- `CampCard.tsx` - Camp display card
- `BookingForm.tsx` - Booking form component
- `PriceCalculator.tsx` - Price calculation widget
- `WeatherWidget.tsx` - Weather display
- `ReviewForm.tsx` - Review submission form
- `LoadingSpinner.tsx` - Loading state
- `Toast.tsx` - Notification component

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 📝 Database Seeding

Create sample camps in MongoDB:

```javascript
// scripts/seed.js
const camps = [
  {
    slug: 'pawna-lake-camping',
    title: 'Pawna Lake Lakeside Camping',
    location: 'Pawna Lake, Lonavala',
    locationType: 'lakeside',
    description: 'Experience serene lakeside camping...',
    price: { adult: 899, child: 499 },
    images: ['url1', 'url2'],
    inclusions: ['Tent Stay', 'BBQ', 'Bonfire', 'DJ Music'],
    // ... more fields
  },
  // Add more camps
];
```

## 🔒 Security Notes

- Never commit `.env.local` to Git
- Use strong `NEXTAUTH_SECRET`
- Validate all user inputs
- Sanitize database queries
- Use HTTPS in production
- Enable CORS appropriately

## 📞 Support

For issues or questions:
- Email: ${process.env.ADMIN_EMAIL}
- Phone: ${process.env.NEXT_PUBLIC_CONTACT_PHONE}

## 📄 License

MIT License - feel free to use for your projects!

---

**Built with ❤️ for WeekendCamps**
# Build cache cleared
# Build cache cleared
