'use client';

import { IndianRupee } from 'lucide-react';

interface FilterSidebarProps {
    filters: {
        locationType: string[];
        priceRange: [number, number];
        tags: string[];
    };
    onFilterChange: (filters: any) => void;
}

const locationTypes = [
    { value: 'lakeside', label: 'Lakeside' },
    { value: 'hilltop', label: 'Hilltop' },
    { value: 'riverside', label: 'Riverside' },
    { value: 'forest', label: 'Forest' },
];

const popularTags = [
    'family-friendly',
    'couple-friendly',
    'adventure',
    'trekking',
    'water-sports',
    'weekend',
    'kayaking',
    'sunrise',
];

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
    const handleLocationChange = (value: string) => {
        const newLocations = filters.locationType.includes(value)
            ? filters.locationType.filter((t) => t !== value)
            : [...filters.locationType, value];
        onFilterChange({ ...filters, locationType: newLocations });
    };

    const handleTagChange = (value: string) => {
        const newTags = filters.tags.includes(value)
            ? filters.tags.filter((t) => t !== value)
            : [...filters.tags, value];
        onFilterChange({ ...filters, tags: newTags });
    };

    const handlePriceChange = (index: number, value: number) => {
        const newRange: [number, number] = [...filters.priceRange] as [number, number];
        newRange[index] = value;
        onFilterChange({ ...filters, priceRange: newRange });
    };

    const clearFilters = () => {
        onFilterChange({
            locationType: [],
            priceRange: [0, 5000],
            tags: [],
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-secondary transition-colors font-medium"
                >
                    Clear All
                </button>
            </div>

            {/* Location Type */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Location Type</h4>
                <div className="space-y-2">
                    {locationTypes.map((type) => (
                        <label key={type.value} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.locationType.includes(type.value)}
                                onChange={() => handleLocationChange(type.value)}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="text-gray-700 group-hover:text-primary transition-colors">
                                {type.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Min Price</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="number"
                                value={filters.priceRange[0]}
                                onChange={(e) => handlePriceChange(0, parseInt(e.target.value) || 0)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                min="0"
                                max={filters.priceRange[1]}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Max Price</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="number"
                                value={filters.priceRange[1]}
                                onChange={(e) => handlePriceChange(1, parseInt(e.target.value) || 5000)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                min={filters.priceRange[0]}
                                max="10000"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagChange(tag)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filters.tags.includes(tag)
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
