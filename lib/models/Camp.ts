import mongoose, { Schema, model, models } from 'mongoose';

export interface ICamp {
    _id: string;
    slug: string;
    title: string;
    location: string;
    locationType: 'lakeside' | 'hilltop' | 'riverside';
    description: string;
    price: {
        adult: number;
        child: number;
    };
    images: string[];
    inclusions: string[];
    itinerary: {
        time: string;
        activity: string;
    }[];
    faqs: {
        question: string;
        answer: string;
    }[];
    mapEmbedUrl: string;
    availability: {
        date: Date;
        slots: number;
    }[];
    rating: number;
    reviewCount: number;
    tags: string[];
    bestTimeToVisit: string;
    createdAt: Date;
    updatedAt: Date;
}

const CampSchema = new Schema<ICamp>(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        locationType: {
            type: String,
            enum: ['lakeside', 'hilltop', 'riverside'],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            adult: {
                type: Number,
                required: true,
            },
            child: {
                type: Number,
                required: true,
            },
        },
        images: [String],
        inclusions: [String],
        itinerary: [
            {
                time: String,
                activity: String,
            },
        ],
        faqs: [
            {
                question: String,
                answer: String,
            },
        ],
        mapEmbedUrl: String,
        availability: [
            {
                date: Date,
                slots: Number,
            },
        ],
        rating: {
            type: Number,
            default: 0,
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
        tags: [String],
        bestTimeToVisit: String,
    },
    {
        timestamps: true,
    }
);

CampSchema.index({ slug: 1 });
CampSchema.index({ locationType: 1 });
CampSchema.index({ 'price.adult': 1 });

const Camp = models.Camp || model<ICamp>('Camp', CampSchema);

export default Camp;
