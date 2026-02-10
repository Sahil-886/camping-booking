'use client';

import { useState } from 'react';
import { Calendar, Users, IndianRupee, Mail, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface BookingFormProps {
    campId: string;
    campTitle: string;
    price: {
        adult: number;
        child: number;
    };
}

export default function BookingForm({ campId, campTitle, price }: BookingFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        bookingDate: '',
        adults: 2,
        children: 0,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
    });

    const totalPrice = formData.adults * price.adult + formData.children * price.child;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campId,
                    bookingDate: formData.bookingDate,
                    persons: {
                        adults: formData.adults,
                        children: formData.children,
                    },
                    customer: {
                        name: formData.customerName,
                        email: formData.customerEmail,
                        phone: formData.customerPhone,
                    },
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Booking confirmed! Check your email for details.');
                router.push(`/booking/${data.bookingId}`);
            } else {
                toast.error(data.error || 'Booking failed. Please try again.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Adventure</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Booking Date
                    </label>
                    <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.bookingDate}
                        onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                {/* Adults */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Adults
                    </label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={formData.adults}
                            onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                            className="flex-1 text-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                        >
                            +
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">₹{price.adult} per adult</p>
                </div>

                {/* Children */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Children (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            min="0"
                            value={formData.children}
                            onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                            className="flex-1 text-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                        >
                            +
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">₹{price.child} per child</p>
                </div>

                {/* Customer Info */}
                <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Your Details</h4>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <User className="w-4 h-4 inline mr-2" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.customerName}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.customerEmail}
                                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Phone
                            </label>
                            <input
                                type="tel"
                                required
                                value={formData.customerPhone}
                                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="+91 9876543210"
                            />
                        </div>
                    </div>
                </div>

                {/* Total Price */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Total Amount</span>
                        <div className="flex items-center gap-1 text-3xl font-bold text-gray-900">
                            <IndianRupee className="w-6 h-6" />
                            {totalPrice}
                        </div>
                    </div>
                    <p className="text-xs text-gray-600">
                        {formData.adults} adult{formData.adults > 1 ? 's' : ''}
                        {formData.children > 0 && ` + ${formData.children} child${formData.children > 1 ? 'ren' : ''}`}
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    You'll receive a confirmation email with booking details
                </p>
            </form>
        </div>
    );
}
