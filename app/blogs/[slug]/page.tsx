import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getBlogData(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs/${slug}`,
            { cache: 'no-store' }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        return null;
    }
}

async function getRelatedBlogs(currentSlug: string, tags: string[]) {
    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs`,
            { cache: 'no-store' }
        );
        if (!res.ok) return [];
        const allBlogs = await res.json();

        // Filter out current blog and find blogs with matching tags
        return allBlogs
            .filter((blog: any) =>
                blog.slug !== currentSlug &&
                blog.tags.some((tag: string) => tags.includes(tag))
            )
            .slice(0, 3);
    } catch (error) {
        return [];
    }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
    const blog = await getBlogData(params.slug);

    if (!blog) {
        notFound();
    }

    const relatedBlogs = await getRelatedBlogs(blog.slug, blog.tags);
    const readTime = Math.max(5, Math.ceil(blog.content.length / 1000));

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20">
                <article className="container mx-auto px-4 py-12">
                    {/* Back Button */}
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">Back to Blog</span>
                    </Link>

                    {/* Main Content */}
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <header className="mb-8">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {blog.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                {blog.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    <span>{blog.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span>{readTime} min read</span>
                                </div>
                            </div>

                            {/* Share Buttons */}
                            <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                                <span className="text-sm text-gray-600 font-medium">Share:</span>
                                <button className="p-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-gray-100 hover:bg-blue-400 hover:text-white rounded-lg transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-gray-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
                            <Image
                                src={blog.featuredImage || '/placeholder-blog.jpg'}
                                alt={blog.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
                            <div className="prose prose-lg max-w-none">
                                <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                                    {blog.excerpt}
                                </p>
                                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {blog.content}
                                </div>
                            </div>
                        </div>

                        {/* Related Posts */}
                        {relatedBlogs.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedBlogs.map((relatedBlog: any) => (
                                        <Link
                                            key={relatedBlog._id}
                                            href={`/blogs/${relatedBlog.slug}`}
                                            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <div className="relative h-48">
                                                <Image
                                                    src={relatedBlog.featuredImage}
                                                    alt={relatedBlog.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                                                    {relatedBlog.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                    {relatedBlog.excerpt}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>

            <Footer />
        </>
    );
}
