'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: 'Booking & Payments',
            questions: [
                {
                    q: 'How do I book a camping trip?',
                    a: 'Simply browse our camps, select your preferred location and date, fill in the booking form with your details, and submit. You\'ll receive a confirmation email with your booking ID.',
                },
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. Payment is processed securely through our booking system.',
                },
                {
                    q: 'Can I cancel or modify my booking?',
                    a: 'Yes! You can cancel up to 48 hours before your trip for a full refund. For modifications, please contact us at dabhadetejas165@gmail.com or call +91 8530160937.',
                },
                {
                    q: 'Do I need to pay the full amount while booking?',
                    a: 'You can either pay the full amount or make a 50% advance payment. The remaining balance must be paid before check-in.',
                },
            ],
        },
        {
            category: 'Camping Experience',
            questions: [
                {
                    q: 'What is included in the camping package?',
                    a: 'Our standard package includes tent accommodation, sleeping bags, bonfire, basic meals (breakfast and dinner), and guided activities. Specific inclusions vary by camp - check the camp details page.',
                },
                {
                    q: 'What should I bring for camping?',
                    a: 'Bring comfortable clothes, personal toiletries, a flashlight, sunscreen, insect repellent, and any personal medications. We provide tents, sleeping bags, and camping equipment.',
                },
                {
                    q: 'Is camping safe for beginners?',
                    a: 'Absolutely! All our camps are beginner-friendly with experienced guides. We provide safety briefings and ensure all necessary precautions are in place.',
                },
                {
                    q: 'What are the check-in and check-out times?',
                    a: 'Check-in is typically from 2:00 PM onwards, and check-out is by 11:00 AM the next day. Times may vary by location - please check your booking confirmation.',
                },
            ],
        },
        {
            category: 'Facilities & Amenities',
            questions: [
                {
                    q: 'Are washrooms available at the campsite?',
                    a: 'Yes, all our campsites have clean washroom facilities with running water. Some premium locations also offer hot water showers.',
                },
                {
                    q: 'Is electricity available?',
                    a: 'Most camps have limited electricity for charging phones and basic lighting. We recommend bringing power banks for extended use.',
                },
                {
                    q: 'What about food? Can I bring my own?',
                    a: 'Meals are included in most packages. You can bring snacks, but outside cooking is not allowed due to safety and environmental reasons. Special dietary requirements can be accommodated - please inform us in advance.',
                },
                {
                    q: 'Is WiFi available?',
                    a: 'Most camps have limited or no WiFi to help you disconnect and enjoy nature. Mobile network coverage varies by location.',
                },
            ],
        },
        {
            category: 'Group & Family Camping',
            questions: [
                {
                    q: 'Do you offer group discounts?',
                    a: 'Yes! Groups of 10 or more get special discounts. Contact us for customized group packages and corporate bookings.',
                },
                {
                    q: 'Is camping suitable for children?',
                    a: 'Yes, we have family-friendly camps with safe activities for children. Kids under 5 years get 50% discount, and under 3 years are free.',
                },
                {
                    q: 'Can we organize corporate team outings?',
                    a: 'Absolutely! We specialize in corporate team-building events with customized activities, larger capacity, and dedicated coordination.',
                },
            ],
        },
        {
            category: 'Weather & Seasons',
            questions: [
                {
                    q: 'What is the best season for camping?',
                    a: 'October to March (winter) is ideal with pleasant weather. Monsoon (June-September) offers lush greenery but may have rain. Summer (April-May) is good for lakeside camps.',
                },
                {
                    q: 'What happens if it rains?',
                    a: 'Our tents are waterproof and we have covered areas for activities. In case of severe weather warnings, we may reschedule your trip with full flexibility.',
                },
                {
                    q: 'How cold does it get at night?',
                    a: 'Winter nights can be chilly (10-15°C). We provide sleeping bags, but bring warm clothes. Summer nights are comfortable (20-25°C).',
                },
            ],
        },
        {
            category: 'Safety & Health',
            questions: [
                {
                    q: 'What safety measures do you have?',
                    a: 'We have trained guides, first-aid kits, emergency contacts, safety briefings, and follow all standard camping safety protocols.',
                },
                {
                    q: 'Is medical assistance available?',
                    a: 'We have basic first-aid facilities at all camps. For emergencies, we have tie-ups with nearby hospitals and 24/7 emergency support.',
                },
                {
                    q: 'Can I camp if I have health conditions?',
                    a: 'Please inform us about any health conditions while booking. Our team will assess and suggest suitable camps and activities.',
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Everything you need to know about camping with WeekendCamps
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">{category.category}</h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, qIndex) => {
                                    const globalIndex = catIndex * 100 + qIndex;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div
                                            key={qIndex}
                                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                )}
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-4 text-gray-600">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Can't find the answer you're looking for? Our friendly team is here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="btn-primary px-8 py-3 rounded-full font-semibold"
                        >
                            Contact Us
                        </a>
                        <a
                            href="tel:+918530160937"
                            className="btn-outline px-8 py-3 rounded-full font-semibold"
                        >
                            Call: +91 8530160937
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
