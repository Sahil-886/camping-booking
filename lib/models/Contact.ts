import mongoose, { Schema, model, models } from 'mongoose';

export interface IContact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'responded';
    createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['new', 'read', 'responded'],
            default: 'new',
        },
    },
    {
        timestamps: true,
    }
);

ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });

const Contact = models.Contact || model<IContact>('Contact', ContactSchema);

export default Contact;
