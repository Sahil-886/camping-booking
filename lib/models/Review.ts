import mongoose, { Schema, model, models } from 'mongoose';

export interface IReview {
    _id: string;
    camp: mongoose.Types.ObjectId;
    customerName: string;
    email: string;
    rating: number;
    comment: string;
    approved: boolean;
    createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
    {
        camp: {
            type: Schema.Types.ObjectId,
            ref: 'Camp',
            required: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
        approved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

ReviewSchema.index({ camp: 1, approved: 1 });
ReviewSchema.index({ createdAt: -1 });

const Review = models.Review || model<IReview>('Review', ReviewSchema);

export default Review;
