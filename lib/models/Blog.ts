import mongoose, { Schema, model, models } from 'mongoose';

export interface IBlog {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    featuredImage: string;
    images: string[];
    tags: string[];
    metaTitle: string;
    metaDescription: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
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
        excerpt: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            default: 'WeekendCamps Team',
        },
        featuredImage: String,
        images: [String],
        tags: [String],
        metaTitle: String,
        metaDescription: String,
        published: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

BlogSchema.index({ slug: 1 });
BlogSchema.index({ published: 1 });
BlogSchema.index({ createdAt: -1 });

const Blog = models.Blog || model<IBlog>('Blog', BlogSchema);

export default Blog;
