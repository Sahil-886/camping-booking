'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Blog {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    featuredImage: string;
    tags: string[];
    createdAt: string;
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [allTags, setAllTags] = useState<string[]>([]);

    // Fetch blogs
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch('/api/blogs');
                if (res.ok) {
                    const data = await res.json();
                    setBlogs(data);
                    setFilteredBlogs(data);

                    // Extract unique tags
                    const tags = new Set<string>();
                    data.forEach((blog: Blog) => {
                        blog.tags.forEach((tag: string) => tags.add(tag));
                    });
                    setAllTags(Array.from(tags));
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...blogs];

        // Search filter
        if (searchQuery) {
            result = result.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Tag filter
        if (selectedTag) {
            result = result.filter((blog) => blog.tags.includes(selectedTag));
        }

        setFilteredBlogs(result);
    }, [blogs, searchQuery, selectedTag]);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Header */}
                <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Blog</h1>
                        <p className="text-xl opacity-90">
                            Tips, guides, and stories from our camping adventures
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Search and Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search blog posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Tag Filter */}
                        <select
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                        >
                            <option value="">All Topics</option>
                            {allTags.map((tag) => (
                                <option key={tag} value={tag}>
                                    {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Blogs Grid */}
                    {loading ? (
                        <LoadingSpinner />
                    ) : filteredBlogs.length > 0 ? (
                        <>
                            <div className="mb-4 text-gray-600">
                                Showing {filteredBlogs.length} of {blogs.length} posts
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredBlogs.map((blog) => (
                                    <BlogCard key={blog._id} {...blog} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
                            <p className="text-gray-600 mb-6">
                                Try adjusting your search or filter
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedTag('');
                                }}
                                className="btn-primary px-6 py-3 rounded-full"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
