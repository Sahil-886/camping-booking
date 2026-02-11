'use client';

import { useEffect, useState } from 'use';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, Download, MessageCircle, ArrowRight, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import confetti from 'canvas-confetti';

interface BookingDetails {
    bookingId: string;
    campTitle: string;
    campLocation: string;
    bookingDate: string;
    adults: number;
    children: number;
    totalAmount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    paymentId: string;
}

export default function PaymentSuccessPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params?.bookingId as string;
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Trigger confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });

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

    const handleDownloadInvoice = () => {
        // Trigger invoice download
        window.open(`/api/bookings/${bookingId}/invoice`, '_blank');
    };

    const handleWhatsAppConfirmation = () => {
        const message = `Hi! I've successfully booked ${booking?.campTitle}. Booking ID: ${bookingId}`;
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

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Success Animation */}
                    <div className="text-center mb-8">
                        <div className="inline-block bg-green-500 p-6 rounded-full mb-6 animate-bounce">
                            <CheckCircle className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Payment Successful! 🎉
                        </h1>
                        <p className="text-xl text-gray-700">
                            Your camping adventure is confirmed!
                        </p>
                    </div>

                    {/* Booking Details Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                        <div className="text-center mb-6">
                            <div className="text-sm text-gray-600 mb-2">Booking ID</div>
                            <div className="text-3xl font-bold text-primary">{bookingId}</div>
                        </div>

                        <div className="border-t border-b border-gray-200 py-6 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Camp</span>
                                <span className="font-semibold text-right">{booking?.campTitle}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Location</span>
                                <span className="font-semibold">{booking?.campLocation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Check-in Date</span>
                                <span className="font-semibold">
                                    {booking?.bookingDate && new Date(booking.bookingDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Guests</span>
                                <span className="font-semibold">
                                    {booking?.adults} Adult{(booking?.adults || 0) > 1 ? 's' : ''}
                                    {(booking?.children || 0) > 0 && `, ${booking?.children} Child${(booking?.children || 0) > 1 ? 'ren' : ''}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-gray-600">Amount Paid</span>
                                <span className="font-bold text-green-600">₹{booking?.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                <div className="text-sm text-gray-700">
                                    <p className="font-semibold text-green-900 mb-1">Confirmation sent!</p>
                                    <p>We've sent booking confirmation to <strong>{booking?.customerEmail}</strong> and <strong>{booking?.customerPhone}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <button
                            onClick={handleDownloadInvoice}
                            className="btn-primary py-4 flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            Download Invoice
                        </button>
                        <button
                            onClick={handleWhatsAppConfirmation}
                            className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp Confirmation
                        </button>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                    <Calendar className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Save Your Booking ID</div>
                                    <div className="text-sm text-gray-600">Keep {bookingId} handy for tracking</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Detailed Itinerary</div>
                                    <div className="text-sm text-gray-600">You'll receive it 48 hours before your trip</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                    <Download className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Trip Checklist</div>
                                    <div className="text-sm text-gray-600">Check your email for the packing checklist PDF</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={`/track-booking?id=${bookingId}`}
                            className="btn-secondary py-4 flex items-center justify-center gap-2 flex-1"
                        >
                            Track Booking
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <a
                            href="/camps"
                            className="btn-outline py-4 flex items-center justify-center gap-2 flex-1"
                        >
                            Book Another Trip
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
