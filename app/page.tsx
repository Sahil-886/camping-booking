import Link from 'next/link';
import { Sparkles, Shield, Award, HeartHandshake, ArrowRight, MapPin, Star, Users } from 'lucide-react';
import CampCard from '@/components/CampCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getFeaturedCamps() {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/camps`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];
        const camps = await res.json();
        return camps.slice(0, 3); // Get top 3 camps
    } catch (error) {
        console.error('Error fetching camps:', error);
        return [];
    }
}

export default async function HomePage() {
    const featuredCamps = await getFeaturedCamps();

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920)',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-primary/60"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center text-white pt-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium">Best Camping Experience Near Pune & Mumbai</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Adventure Awaits at
                            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                WeekendCamps
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
                            Escape the city chaos. Experience lakeside camping, hilltop adventures, and riverside thrills.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/camps"
                                className="btn-primary px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-2 group"
                            >
                                Explore Camps
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 rounded-full text-lg font-semibold bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
                                <div className="text-sm text-gray-300">Happy Campers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-yellow-400 mb-2">10+</div>
                                <div className="text-sm text-gray-300">Locations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-yellow-400 mb-2">4.8★</div>
                                <div className="text-sm text-gray-300">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Featured Camps Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Featured Camping Experiences
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Handpicked destinations for your perfect weekend getaway
                        </p>
                    </div>

                    {featuredCamps.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {featuredCamps.map((camp: any) => (
                                <CampCard key={camp._id} {...camp} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No camps available at the moment.</p>
                        </div>
                    )}

                    <div className="text-center">
                        <Link
                            href="/camps"
                            className="btn-secondary px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center gap-2 group"
                        >
                            View All Camps
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose WeekendCamps?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We make your camping experience safe, comfortable, and unforgettable
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Safe</h3>
                            <p className="text-gray-600">
                                24/7 security, first aid, and trained staff for your safety
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Best Locations</h3>
                            <p className="text-gray-600">
                                Handpicked scenic spots near Pune and Mumbai
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <HeartHandshake className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">All Inclusive</h3>
                            <p className="text-gray-600">
                                Meals, activities, and equipment - everything included
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Group Friendly</h3>
                            <p className="text-gray-600">
                                Perfect for families, friends, and corporate outings
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready for Your Next Adventure?
                    </h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
                        Book your camping experience today and create memories that last a lifetime
                    </p>
                    <Link
                        href="/camps"
                        className="bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 group"
                    >
                        Book Your Camp Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
