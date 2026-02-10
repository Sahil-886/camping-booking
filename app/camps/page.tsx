'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CampCard from '@/components/CampCard';
import FilterSidebar from '@/components/FilterSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';

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

export default function CampsPage() {
    const [camps, setCamps] = useState<Camp[]>([]);
    const [filteredCamps, setFilteredCamps] = useState<Camp[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        locationType: [] as string[],
        priceRange: [0, 5000] as [number, number],
        tags: [] as string[],
    });

    // Fetch camps
    useEffect(() => {
        async function fetchCamps() {
            try {
                const res = await fetch('/api/camps');
                if (res.ok) {
                    const data = await res.json();
                    setCamps(data);
                    setFilteredCamps(data);
                }
            } catch (error) {
                console.error('Error fetching camps:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCamps();
    }, []);

    // Apply filters and search
    useEffect(() => {
        let result = [...camps];

        // Search filter
        if (searchQuery) {
            result = result.filter(
                (camp) =>
                    camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    camp.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Location type filter
        if (filters.locationType.length > 0) {
            result = result.filter((camp) => filters.locationType.includes(camp.locationType));
        }

        // Price range filter
        result = result.filter(
            (camp) =>
                camp.price.adult >= filters.priceRange[0] && camp.price.adult <= filters.priceRange[1]
        );

        // Tags filter
        if (filters.tags.length > 0) {
            result = result.filter((camp) =>
                filters.tags.some((tag) => camp.tags.includes(tag))
            );
        }

        // Sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price.adult - b.price.adult;
                case 'price-high':
                    return b.price.adult - a.price.adult;
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                    return b.reviewCount - a.reviewCount;
                default:
                    return 0;
            }
        });

        setFilteredCamps(result);
    }, [camps, searchQuery, filters, sortBy]);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Header */}
                <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore All Camps</h1>
                        <p className="text-xl opacity-90">
                            Find your perfect camping destination from our curated collection
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Search and Sort Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search camps by name, location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                        >
                            <option value="rating">Highest Rated</option>
                            <option value="popular">Most Popular</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden btn-secondary px-6 py-3 rounded-xl inline-flex items-center gap-2"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className={`md:w-80 ${showFilters ? 'block' : 'hidden md:block'}`}>
                            <FilterSidebar filters={filters} onFilterChange={setFilters} />
                        </div>

                        {/* Camps Grid */}
                        <div className="flex-1">
                            {loading ? (
                                <LoadingSpinner />
                            ) : filteredCamps.length > 0 ? (
                                <>
                                    <div className="mb-4 text-gray-600">
                                        Showing {filteredCamps.length} of {camps.length} camps
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredCamps.map((camp) => (
                                            <CampCard key={camp._id} {...camp} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🏕️</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No camps found</h3>
                                    <p className="text-gray-600 mb-6">
                                        Try adjusting your filters or search query
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setFilters({
                                                locationType: [],
                                                priceRange: [0, 5000],
                                                tags: [],
                                            });
                                        }}
                                        className="btn-primary px-6 py-3 rounded-full"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
