'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CampCard from '@/components/CampCard';
import { Mountain, Waves, Trees, Tent } from 'lucide-react';

const locationData = {
    lakeside: {
        title: 'Lakeside Camping',
        description: 'Experience tranquil camping by serene lakes with stunning water views and peaceful surroundings',
        icon: Waves,
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200',
        features: ['Water Activities', 'Kayaking', 'Scenic Views', 'Peaceful Atmosphere'],
        color: 'from-blue-500 to-cyan-500',
    },
    hilltop: {
        title: 'Hilltop Camping',
        description: 'Camp on mountain peaks with panoramic valley views, cool breeze, and adventure activities',
        icon: Mountain,
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200',
        features: ['Mountain Views', 'Trekking', 'Sunrise/Sunset', 'Adventure Sports'],
        color: 'from-green-500 to-emerald-500',
    },
    riverside: {
        title: 'Riverside Camping',
        description: 'Enjoy camping along flowing rivers with water sports, rafting, and nature trails',
        icon: Waves,
        image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1200',
        features: ['River Rafting', 'Kayaking', 'Water Sports', 'Nature Trails'],
        color: 'from-teal-500 to-cyan-600',
    },
    forest: {
        title: 'Forest Camping',
        description: 'Immerse yourself in dense forests with wildlife, bird watching, and nature exploration',
        icon: Trees,
        image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200',
        features: ['Wildlife', 'Bird Watching', 'Nature Trails', 'Dense Greenery'],
        color: 'from-green-600 to-lime-500',
    },
};

interface Camp {
    _id: string;
    slug: string;
    title: string;
    location: string;
    locationType: string;
    description: string;
    price: { adult: number; child: number };
    images: string[];
    rating: number;
    reviewCount: number;
    tags: string[];
}

export default function LocationCategoryPage() {
    const params = useParams();
    const locationType = params?.type as string;
    const [camps, setCamps] = useState<Camp[]>([]);
    const [loading, setLoading] = useState(true);

    const locationInfo = locationData[locationType as keyof typeof locationData];
    const Icon = locationInfo?.icon || Tent;

    useEffect(() => {
        async function fetchCamps() {
            try {
                const res = await fetch(`/api/camps?locationType=${locationType}`);
                if (res.ok) {
                    const data = await res.json();
                    setCamps(data);
                }
            } catch (error) {
                console.error('Error fetching camps:', error);
            } finally {
                setLoading(false);
            }
        }
        if (locationType) {
            fetchCamps();
        }
    }, [locationType]);

    if (!locationInfo) {
        return <div>Location type not found</div>;
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Hero Section */}
                <div className="relative h-[500px] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${locationInfo.image})` }}
                    >
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                    <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
                        <div className={`bg-gradient-to-r ${locationInfo.color} p-4 rounded-full mb-6`}>
                            <Icon className="w-12 h-12" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">{locationInfo.title}</h1>
                        <p className="text-xl md:text-2xl max-w-3xl opacity-90">{locationInfo.description}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-4 mt-8 justify-center">
                            {locationInfo.features.map((feature, index) => (
                                <div key={index} className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Camps Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Available {locationInfo.title} Camps
                        </h2>
                        <p className="text-gray-600">
                            {camps.length} {camps.length === 1 ? 'camp' : 'camps'} found
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                        </div>
                    ) : camps.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {camps.map((camp) => (
                                <CampCard key={camp._id} {...camp} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🏕️</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No camps found</h3>
                            <p className="text-gray-600 mb-6">
                                We don't have any {locationInfo.title.toLowerCase()} camps available right now.
                            </p>
                            <a href="/camps" className="btn-primary px-6 py-3 rounded-full inline-block">
                                View All Camps
                            </a>
                        </div>
                    )}
                </div>

                {/* Why Choose Section */}
                <div className={`bg-gradient-to-br ${locationInfo.color} text-white py-16`}>
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">Why Choose {locationInfo.title}?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {locationInfo.features.map((feature, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                    <div className="text-4xl mb-4">✨</div>
                                    <h3 className="text-xl font-bold">{feature}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
