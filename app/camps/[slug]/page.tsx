import { notFound } from 'next/navigation';
import { MapPin, Clock, Check, ChevronDown, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import BookingForm from '@/components/BookingForm';
import ReviewsList from '@/components/ReviewsList';

async function getCampData(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/camps/${slug}`,
            { cache: 'no-store' }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        return null;
    }
}

export default async function CampDetailPage({ params }: { params: { slug: string } }) {
    const camp = await getCampData(params.slug);

    if (!camp) {
        notFound();
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="container mx-auto px-4 py-12">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-600 mb-6">
                        <a href="/" className="hover:text-primary">Home</a>
                        {' / '}
                        <a href="/camps" className="hover:text-primary">Camps</a>
                        {' / '}
                        <span className="text-gray-900">{camp.title}</span>
                    </div>

                    {/* Title and Location */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{camp.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>{camp.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{camp.rating}</span>
                                <span>({camp.reviewCount} reviews)</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {camp.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="mb-12">
                        <ImageGallery images={camp.images} title={camp.title} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Camp</h2>
                                <p className="text-gray-700 leading-relaxed">{camp.description}</p>
                            </div>

                            {/* Inclusions */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {camp.inclusions.map((item: string, index: number) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
                                <div className="space-y-4">
                                    {camp.itinerary.map((item: any, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold flex-shrink-0">
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                {index < camp.itinerary.length - 1 && (
                                                    <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                                                )}
                                            </div>
                                            <div className="pb-8">
                                                <div className="font-semibold text-primary mb-1">{item.time}</div>
                                                <div className="text-gray-700">{item.activity}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQs */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {camp.faqs.map((faq: any, index: number) => (
                                        <details key={index} className="group">
                                            <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                                <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                                            </summary>
                                            <div className="p-4 text-gray-700">{faq.answer}</div>
                                        </details>
                                    ))}
                                </div>
                            </div>

                            {/* Best Time to Visit */}
                            {camp.bestTimeToVisit && (
                                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Best Time to Visit</h3>
                                    <p className="text-gray-700">{camp.bestTimeToVisit}</p>
                                </div>
                            )}

                            {/* Map */}
                            {camp.mapEmbedUrl && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                                    <div className="aspect-video rounded-xl overflow-hidden">
                                        <iframe
                                            src={camp.mapEmbedUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Reviews */}
                            <ReviewsList campId={camp._id} reviews={camp.reviews || []} />
                        </div>

                        {/* Sidebar - Booking Form */}
                        <div className="lg:col-span-1">
                            <BookingForm
                                campId={camp._id}
                                campTitle={camp.title}
                                price={camp.price}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
