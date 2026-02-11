'use client';

import Image from 'next/image';
import { Tent, Users, Award, Heart, Target, Shield } from 'lucide-react';

export default function AboutPage() {
    const stats = [
        { icon: Users, label: 'Happy Campers', value: '500+' },
        { icon: Tent, label: 'Camping Sites', value: '15+' },
        { icon: Award, label: 'Years Experience', value: '5+' },
        { icon: Heart, label: 'Customer Rating', value: '4.8/5' },
    ];

    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To make camping accessible and enjoyable for everyone, creating unforgettable outdoor experiences near Pune and Mumbai.',
        },
        {
            icon: Shield,
            title: 'Safety First',
            description: 'We prioritize your safety with trained guides, quality equipment, and comprehensive safety protocols at all our camps.',
        },
        {
            icon: Heart,
            title: 'Sustainability',
            description: 'We are committed to eco-friendly camping practices, leaving no trace and preserving nature for future generations.',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">About WeekendCamps</h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Your gateway to unforgettable camping experiences in the heart of nature
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <p className="mb-4">
                                WeekendCamps was born from a simple idea: everyone deserves to experience the magic of camping,
                                regardless of their experience level. Founded in 2019, we started with a single campsite near Pawna Lake
                                and a dream to connect people with nature.
                            </p>
                            <p className="mb-4">
                                Today, we operate 15+ premium camping locations across Maharashtra, from serene lakesides to
                                adventurous hilltops. We've hosted over 500 happy campers, creating memories that last a lifetime.
                            </p>
                            <p>
                                Our team of experienced guides and outdoor enthusiasts is passionate about sharing the beauty of
                                nature while ensuring your comfort and safety. Whether you're a solo traveler, a couple seeking romance,
                                or a family looking for adventure, we have the perfect camping experience for you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center">
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Why Choose Us?</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                'Experienced and certified guides',
                                'Premium camping equipment',
                                'Carefully selected scenic locations',
                                'Flexible booking and cancellation',
                                'Customizable packages',
                                '24/7 customer support',
                                'Eco-friendly practices',
                                'Affordable pricing',
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join hundreds of happy campers who have experienced the magic of nature with us
                    </p>
                    <a
                        href="/camps"
                        className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Explore Our Camps
                    </a>
                </div>
            </section>
        </div>
    );
}
