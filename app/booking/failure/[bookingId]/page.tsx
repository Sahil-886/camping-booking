'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { XCircle, RefreshCw, MessageCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BookingDetails {
    bookingId: string;
    campTitle: string;
    totalAmount: number;
    customerName: string;
    customerEmail: string;
}

export default function PaymentFailurePage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params?.bookingId as string;
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooking() {
            try {
                const res = await fetch(`/api/bookings/${bookingId}`);
                if (res.ok) {
                    const data = await res.json();
                    setBooking(data);
                }
            } catch (error) {
                console.error('Error fetching booking:', error);
            } finally {
                setLoading(false);
            }
        }

        if (bookingId) {
            fetchBooking();
        }
    }, [bookingId]);

    const handleRetryPayment = () => {
        router.push(`/booking/payment/${bookingId}`);
    };

    const handleContactSupport = () => {
        const message = `Hi! I need help with my booking. Booking ID: ${bookingId}. Payment failed.`;
        window.open(`https://wa.me/918530160937?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Failure Animation */}
                    <div className="text-center mb-8">
                        <div className="inline-block bg-red-500 p-6 rounded-full mb-6">
                            <XCircle className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Payment Failed
                        </h1>
                        <p className="text-xl text-gray-700">
                            Don't worry, your booking is still reserved!
                        </p>
                    </div>

                    {/* Booking Details Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                        <div className="text-center mb-6">
                            <div className="text-sm text-gray-600 mb-2">Booking ID</div>
                            <div className="text-3xl font-bold text-gray-900">{bookingId}</div>
                        </div>

                        <div className="border-t border-b border-gray-200 py-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Camp</span>
                                <span className="font-semibold text-right">{booking?.campTitle}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Customer</span>
                                <span className="font-semibold">{booking?.customerName}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-gray-600">Amount Due</span>
                                <span className="font-bold text-red-600">₹{booking?.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <div className="text-sm text-gray-700">
                                    <p className="font-semibold text-yellow-900 mb-1">Payment Not Completed</p>
                                    <p>Your booking is reserved for 30 minutes. Please complete the payment to confirm your spot.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Common Reasons */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Reasons for Payment Failure</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                                <span>Insufficient balance in your account</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                                <span>Incorrect card details or CVV</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                                <span>Bank declined the transaction</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                                <span>Network connectivity issues</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                                <span>Payment gateway timeout</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <button
                            onClick={handleRetryPayment}
                            className="btn-primary py-4 flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Retry Payment
                        </button>
                        <button
                            onClick={handleContactSupport}
                            className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Contact Support
                        </button>
                    </div>

                    {/* Alternative Payment Methods */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Try Alternative Payment Methods</h3>
                        <p className="text-gray-600 mb-4">
                            If your card payment failed, you can try:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-2xl mb-1">📱</div>
                                <div className="text-sm font-semibold">UPI</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-2xl mb-1">🏦</div>
                                <div className="text-sm font-semibold">Net Banking</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-2xl mb-1">💳</div>
                                <div className="text-sm font-semibold">Debit Card</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-2xl mb-1">👛</div>
                                <div className="text-sm font-semibold">Wallet</div>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => router.push('/camps')}
                            className="btn-outline py-3 px-6 flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Camps
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
