'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, Users, MapPin, CreditCard, ArrowRight, Edit } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

interface BookingData {
    campTitle: string;
    campLocation: string;
    campImage: string;
    bookingDate: string;
    adults: number;
    children: number;
    pricePerAdult: number;
    pricePerChild: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    totalAmount: number;
}

export default function BookingSummaryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Get booking data from session storage or URL params
        const storedData = sessionStorage.getItem('pendingBooking');
        if (storedData) {
            setBookingData(JSON.parse(storedData));
        } else {
            toast.error('No booking data found');
            router.push('/camps');
        }
    }, [router]);

    const handleProceedToPayment = async () => {
        if (!bookingData) return;

        setLoading(true);
        try {
            // Create booking in database
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campSlug: searchParams?.get('camp') || '',
                    customerName: bookingData.customerName,
                    customerEmail: bookingData.customerEmail,
                    customerPhone: bookingData.customerPhone,
                    bookingDate: bookingData.bookingDate,
                    adults: bookingData.adults,
                    children: bookingData.children,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Redirect to payment page
                router.push(`/booking/payment/${data.bookingId}`);
            } else {
                toast.error('Failed to create booking');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (!bookingData) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
                </div>
            </>
        );
    }

    const subtotal = (bookingData.adults * bookingData.pricePerAdult) + (bookingData.children * bookingData.pricePerChild);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Summary</h1>
                        <p className="text-gray-600">Review your booking details before proceeding to payment</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Camp Details */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="h-48 relative">
                                    <img
                                        src={bookingData.campImage}
                                        alt={bookingData.campTitle}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{bookingData.campTitle}</h2>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        {bookingData.campLocation}
                                    </div>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-3 border-b">
                                        <div className="flex items-center text-gray-700">
                                            <Calendar className="w-5 h-5 mr-3 text-primary" />
                                            <span>Check-in Date</span>
                                        </div>
                                        <span className="font-semibold">{new Date(bookingData.bookingDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b">
                                        <div className="flex items-center text-gray-700">
                                            <Users className="w-5 h-5 mr-3 text-primary" />
                                            <span>Guests</span>
                                        </div>
                                        <span className="font-semibold">
                                            {bookingData.adults} Adult{bookingData.adults > 1 ? 's' : ''}
                                            {bookingData.children > 0 && `, ${bookingData.children} Child${bookingData.children > 1 ? 'ren' : ''}`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">Customer Details</h3>
                                    <button
                                        onClick={() => router.back()}
                                        className="text-primary hover:text-primary/80 flex items-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-gray-600">Name:</span>
                                        <span className="ml-2 font-semibold">{bookingData.customerName}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Email:</span>
                                        <span className="ml-2 font-semibold">{bookingData.customerEmail}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Phone:</span>
                                        <span className="ml-2 font-semibold">{bookingData.customerPhone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Price Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-700">
                                        <span>{bookingData.adults} × Adult</span>
                                        <span>₹{(bookingData.adults * bookingData.pricePerAdult).toLocaleString()}</span>
                                    </div>
                                    {bookingData.children > 0 && (
                                        <div className="flex justify-between text-gray-700">
                                            <span>{bookingData.children} × Child</span>
                                            <span>₹{(bookingData.children * bookingData.pricePerChild).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-700 pt-4 border-t">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Tax (5%)</span>
                                        <span>₹{tax.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t-2 mb-6">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>

                                <button
                                    onClick={handleProceedToPayment}
                                    disabled={loading}
                                    className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Proceed to Payment
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <CreditCard className="w-4 h-4" />
                                    <span>Secure payment powered by Razorpay</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
