const mongoose = require('mongoose');

// MongoDB URI from environment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/camping-booking';

if (!MONGODB_URI || MONGODB_URI.includes('your-mongodb-uri-here')) {
    console.error('\n❌ ERROR: Please configure MONGODB_URI in .env.local');
    console.error('\nSteps to fix:');
    console.error('1. Get a free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas');
    console.error('2. Create a cluster and get your connection string');
    console.error('3. Add it to .env.local as MONGODB_URI=mongodb+srv://...');
    console.error('\nOr for local MongoDB:');
    console.error('MONGODB_URI=mongodb://localhost:27017/camping-booking\n');
    process.exit(1);
}

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Import models after connection
        const Camp = mongoose.model('Camp', new mongoose.Schema({
            slug: { type: String, required: true, unique: true },
            title: String,
            location: String,
            locationType: String,
            description: String,
            price: { adult: Number, child: Number },
            images: [String],
            inclusions: [String],
            itinerary: [{ time: String, activity: String }],
            faqs: [{ question: String, answer: String }],
            mapEmbedUrl: String,
            rating: Number,
            reviewCount: Number,
            tags: [String],
            bestTimeToVisit: String,
        }, { timestamps: true }));

        const Blog = mongoose.model('Blog', new mongoose.Schema({
            slug: { type: String, required: true, unique: true },
            title: String,
            excerpt: String,
            content: String,
            author: String,
            featuredImage: String,
            tags: [String],
            metaTitle: String,
            metaDescription: String,
            published: Boolean,
        }, { timestamps: true }));

        const User = mongoose.model('User', new mongoose.Schema({
            email: { type: String, required: true, unique: true },
            password: String,
            name: String,
            role: String,
        }, { timestamps: true }));

        // Clear existing data
        await Camp.deleteMany({});
        await Blog.deleteMany({});
        await User.deleteMany({});
        console.log('✅ Cleared existing data');

        // Create camps
        const camps = await Camp.insertMany([
            {
                slug: 'pawna-lake-camping',
                title: 'Pawna Lake Lakeside Camping',
                location: 'Pawna Lake, Lonavala',
                locationType: 'lakeside',
                description: 'Experience the magic of lakeside camping at Pawna Lake. Wake up to stunning sunrise views, enjoy BBQ under the stars, and create unforgettable memories with friends and family.',
                price: { adult: 899, child: 499 },
                images: [
                    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
                    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d',
                ],
                inclusions: [
                    'Tent Stay (4-6 persons)',
                    'BBQ Dinner',
                    'Breakfast',
                    'Bonfire',
                    'DJ Music',
                    'Indoor & Outdoor Games',
                    'Parking',
                    'First Aid',
                ],
                itinerary: [
                    { time: '3:00 PM', activity: 'Check-in & Welcome Drinks' },
                    { time: '4:00 PM', activity: 'Outdoor Games & Activities' },
                    { time: '6:00 PM', activity: 'Evening Tea & Snacks' },
                    { time: '7:00 PM', activity: 'Bonfire & Music' },
                    { time: '9:00 PM', activity: 'BBQ Dinner' },
                    { time: '11:00 PM', activity: 'Lights Off' },
                    { time: '7:00 AM', activity: 'Wake Up & Breakfast' },
                    { time: '10:00 AM', activity: 'Check-out' },
                ],
                faqs: [
                    { question: 'Is food included in the package?', answer: 'Yes, BBQ dinner and breakfast are included. We also provide evening tea and snacks.' },
                    { question: 'What should I bring?', answer: 'Bring comfortable clothes, toiletries, torch, and any personal medications. We provide tents and bedding.' },
                    { question: 'Is it safe for families?', answer: 'Absolutely! We have 24/7 security, first aid, and trained staff to ensure your safety.' },
                ],
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60598.36890629359!2d73.40739!3d18.70000',
                rating: 4.8,
                reviewCount: 234,
                tags: ['lakeside', 'family-friendly', 'couple-friendly', 'weekend'],
                bestTimeToVisit: 'October to March (Winter & Monsoon)',
            },
            {
                slug: 'lonavala-hill-camping',
                title: 'Lonavala Hilltop Camping',
                location: 'Lonavala Hills',
                locationType: 'hilltop',
                description: 'Escape to the misty hills of Lonavala for an unforgettable camping experience. Enjoy panoramic valley views, cool mountain breeze, and adventure activities.',
                price: { adult: 1199, child: 699 },
                images: [
                    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d',
                    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
                ],
                inclusions: ['Tent Stay', 'All Meals', 'Trekking Guide', 'Bonfire', 'Music', 'Games', 'Photography', 'First Aid'],
                itinerary: [
                    { time: '2:00 PM', activity: 'Check-in' },
                    { time: '3:00 PM', activity: 'Short Trek to Viewpoint' },
                    { time: '6:00 PM', activity: 'Sunset Viewing' },
                    { time: '8:00 PM', activity: 'Dinner' },
                    { time: '6:00 AM', activity: 'Sunrise Trek' },
                    { time: '8:00 AM', activity: 'Breakfast' },
                    { time: '11:00 AM', activity: 'Check-out' },
                ],
                faqs: [
                    { question: 'Is trekking mandatory?', answer: 'No, trekking is optional. You can relax at the campsite if you prefer.' },
                    { question: 'What is the difficulty level?', answer: 'Easy to moderate. Suitable for beginners and families.' },
                ],
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60598.36890629359!2d73.40739!3d18.70000',
                rating: 4.7,
                reviewCount: 189,
                tags: ['hilltop', 'adventure', 'trekking', 'sunrise'],
                bestTimeToVisit: 'September to February',
            },
            {
                slug: 'riverside-camping',
                title: 'Riverside Camping Experience',
                location: 'Kundalika River',
                locationType: 'riverside',
                description: 'Camp by the flowing river and enjoy water activities, kayaking, and peaceful nature. Perfect for adventure enthusiasts and nature lovers.',
                price: { adult: 1499, child: 799 },
                images: [
                    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
                    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d',
                ],
                inclusions: ['Tent Stay', 'All Meals', 'Kayaking', 'River Rafting', 'Bonfire', 'Music', 'Safety Equipment', 'Trained Instructors'],
                itinerary: [
                    { time: '10:00 AM', activity: 'Check-in & Briefing' },
                    { time: '11:00 AM', activity: 'Kayaking Session' },
                    { time: '1:00 PM', activity: 'Lunch' },
                    { time: '3:00 PM', activity: 'River Rafting' },
                    { time: '6:00 PM', activity: 'Evening Snacks' },
                    { time: '8:00 PM', activity: 'Dinner & Bonfire' },
                    { time: '8:00 AM', activity: 'Breakfast' },
                    { time: '10:00 AM', activity: 'Check-out' },
                ],
                faqs: [
                    { question: 'Do I need to know swimming?', answer: 'Not mandatory. We provide life jackets and have trained instructors.' },
                    { question: 'What is the age limit?', answer: 'Minimum 10 years for water activities. Children below 10 can enjoy camping.' },
                ],
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60598.36890629359!2d73.40739!3d18.70000',
                rating: 4.9,
                reviewCount: 156,
                tags: ['riverside', 'adventure', 'water-sports', 'kayaking'],
                bestTimeToVisit: 'June to September (Monsoon)',
            },
        ]);

        console.log(`✅ Created ${camps.length} camps`);

        // Create blog posts
        const blogs = await Blog.insertMany([
            {
                slug: 'best-pawna-lake-camping-guide',
                title: 'Best Pawna Lake Camping Guide - Complete Travel Guide 2026',
                excerpt: 'Everything you need to know about camping at Pawna Lake including best time to visit, how to reach, what to pack, and more.',
                content: '# Best Pawna Lake Camping Guide\n\nPawna Lake has become one of the most popular weekend getaway destinations near Pune and Mumbai...',
                author: 'WeekendCamps Team',
                featuredImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
                tags: ['pawna-lake', 'camping', 'travel-guide'],
                metaTitle: 'Best Pawna Lake Camping Guide 2026 | WeekendCamps',
                metaDescription: 'Complete guide to Pawna Lake camping with tips, best time to visit, how to reach, and booking information.',
                published: true,
            },
            {
                slug: 'top-camping-destinations-near-pune',
                title: 'Top 10 Camping Destinations Near Pune',
                excerpt: 'Discover the best camping spots within 100km of Pune for your next weekend adventure.',
                content: 'Pune is surrounded by beautiful camping destinations...',
                author: 'WeekendCamps Team',
                featuredImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d',
                tags: ['pune', 'camping', 'weekend-getaway'],
                metaTitle: 'Top 10 Camping Destinations Near Pune | WeekendCamps',
                metaDescription: 'Explore the best camping spots near Pune for unforgettable weekend trips.',
                published: true,
            },
        ]);

        console.log(`✅ Created ${blogs.length} blog posts`);

        // Create admin user (with bcrypt)
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            email: 'admin@weekendcamps.com',
            password: hashedPassword,
            name: 'Admin',
            role: 'superadmin',
        });

        console.log('✅ Created admin user:', admin.email);
        console.log('   Password: admin123');

        console.log('\n🎉 Database seeded successfully!\n');
        console.log('You can now:');
        console.log('1. Visit: http://localhost:3000');
        console.log('2. Test API: http://localhost:3000/api/camps');
        console.log('3. Test API: http://localhost:3000/api/blogs\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
}

seed();
