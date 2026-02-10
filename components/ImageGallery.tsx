'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
        setIsLightboxOpen(true);
    };

    const navigate = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else {
            setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
    };

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
                {/* Main Image */}
                <div
                    className="col-span-4 md:col-span-2 row-span-2 relative h-96 cursor-pointer group"
                    onClick={() => openLightbox(0)}
                >
                    <Image
                        src={images[0] || '/placeholder.jpg'}
                        alt={`${title} - Main`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Thumbnail Images */}
                {images.slice(1, 5).map((image, index) => (
                    <div
                        key={index}
                        className="relative h-48 cursor-pointer group overflow-hidden"
                        onClick={() => openLightbox(index + 1)}
                    >
                        <Image
                            src={image}
                            alt={`${title} - ${index + 2}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        {index === 3 && images.length > 5 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">+{images.length - 5}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={() => navigate('prev')}
                        className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    {/* Image */}
                    <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4">
                        <Image
                            src={images[selectedIndex]}
                            alt={`${title} - ${selectedIndex + 1}`}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => navigate('next')}
                        className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                        {selectedIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}
