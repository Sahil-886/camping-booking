import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Users, IndianRupee } from 'lucide-react';

interface CampCardProps {
    slug: string;
    title: string;
    location: string;
    description: string;
    price: {
        adult: number;
        child: number;
    };
    images: string[];
    rating: number;
    reviewCount: number;
    tags: string[];
}

export default function CampCard({
    slug,
    title,
    location,
    description,
    price,
    images,
    rating,
    reviewCount,
    tags,
}: CampCardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={images[0] || '/placeholder-camp.jpg'}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">{rating}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                            <IndianRupee className="w-5 h-5" />
                            {price.adult}
                        </div>
                        <p className="text-xs text-gray-500">per adult</p>
                    </div>

                    <Link
                        href={`/camps/${slug}`}
                        className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2 group/btn"
                    >
                        View Details
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                {/* Reviews Count */}
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{reviewCount} reviews</span>
                </div>
            </div>
        </div>
    );
}
