import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    featuredImage: string;
    tags: string[];
    createdAt: string;
}

export default function BlogCard({
    slug,
    title,
    excerpt,
    author,
    featuredImage,
    tags,
    createdAt,
}: BlogCardProps) {
    // Estimate read time based on excerpt length (rough estimate)
    const readTime = Math.max(3, Math.ceil(excerpt.length / 200));

    return (
        <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            {/* Featured Image */}
            <Link href={`/blogs/${slug}`} className="block relative h-64 overflow-hidden">
                <Image
                    src={featuredImage || '/placeholder-blog.jpg'}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </Link>

            {/* Content */}
            <div className="p-6">
                <Link href={`/blogs/${slug}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </div>

                {/* Read More Link */}
                <Link
                    href={`/blogs/${slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold mt-4 group/link"
                >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </article>
    );
}
