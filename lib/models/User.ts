import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
    _id: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'superadmin';
    createdAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'superadmin'],
            default: 'admin',
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.index({ email: 1 });

const User = models.User || model<IUser>('User', UserSchema);

export default User;
