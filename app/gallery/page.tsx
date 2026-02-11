'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const galleries = [
        {
            category: 'Lakeside Camping',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
                    title: 'Pawna Lake Sunset',
                    location: 'Pawna Lake',
                },
                {
                    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
                    title: 'Lakeside Tents',
                    location: 'Pawna Lake',
                },
                {
                    url: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800',
                    title: 'Morning by the Lake',
                    location: 'Pawna Lake',
                },
            ],
        },
        {
            category: 'Hilltop Adventures',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800',
                    title: 'Mountain Camping',
                    location: 'Lonavala Hills',
                },
                {
                    url: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=800',
                    title: 'Hilltop View',
                    location: 'Lonavala Hills',
                },
                {
                    url: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800',
                    title: 'Sunrise Trek',
                    location: 'Lonavala Hills',
                },
            ],
        },
        {
            category: 'Bonfire Nights',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1525811902-f2342640856e?w=800',
                    title: 'Bonfire Evening',
                    location: 'All Camps',
                },
                {
                    url: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=800',
                    title: 'Starry Night',
                    location: 'All Camps',
                },
                {
                    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
                    title: 'Camp Gathering',
                    location: 'All Camps',
                },
            ],
        },
        {
            category: 'Activities',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800',
                    title: 'Kayaking',
                    location: 'Pawna Lake',
                },
                {
                    url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
                    title: 'Trekking',
                    location: 'Lonavala Hills',
                },
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                    title: 'Mountain Views',
                    location: 'Various Locations',
                },
            ],
        },
    ];

    const allImages = galleries.flatMap((gallery, gIndex) =>
        gallery.images.map((img, iIndex) => ({
            ...img,
            globalIndex: gIndex * 100 + iIndex,
        }))
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Photo Gallery</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Explore the beauty of our camping destinations through stunning visuals
                    </p>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {galleries.map((gallery, gIndex) => (
                        <div key={gIndex} className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">{gallery.category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {gallery.images.map((image, iIndex) => {
                                    const globalIndex = gIndex * 100 + iIndex;
                                    return (
                                        <div
                                            key={iIndex}
                                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                                            onClick={() => setSelectedImage(globalIndex)}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                    <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                                                    <p className="text-sm text-white/80">{image.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <div className="max-w-6xl w-full">
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                            <Image
                                src={allImages.find((img) => img.globalIndex === selectedImage)?.url || ''}
                                alt={allImages.find((img) => img.globalIndex === selectedImage)?.title || ''}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="text-center mt-4 text-white">
                            <h3 className="text-2xl font-bold mb-2">
                                {allImages.find((img) => img.globalIndex === selectedImage)?.title}
                            </h3>
                            <p className="text-white/80">
                                {allImages.find((img) => img.globalIndex === selectedImage)?.location}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Create Your Own Memories?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Book your camping adventure today and experience the beauty of nature firsthand
                    </p>
                    <a
                        href="/camps"
                        className="btn-primary px-8 py-3 rounded-full font-semibold inline-block"
                    >
                        Explore Our Camps
                    </a>
                </div>
            </section>
        </div>
    );
}
