'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CreditCard, Smartphone, Building2, Wallet, Shield, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface BookingDetails {
    bookingId: string;
    campTitle: string;
    totalAmount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
}

export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params?.bookingId as string;
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('upi');

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        async function fetchBooking() {
            try {
                const res = await fetch(`/api/bookings/${bookingId}`);
                if (res.ok) {
                    const data = await res.json();
                    setBooking(data);
                } else {
                    toast.error('Booking not found');
                    router.push('/camps');
                }
            } catch (error) {
                toast.error('Failed to load booking');
            } finally {
                setLoading(false);
            }
        }

        if (bookingId) {
            fetchBooking();
        }
    }, [bookingId, router]);

    const handlePayment = async () => {
        if (!booking) return;

        setProcessing(true);
        try {
            // Create Razorpay order
            const orderRes = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: booking.bookingId,
                    amount: booking.totalAmount,
                }),
            });

            if (!orderRes.ok) {
                throw new Error('Failed to create payment order');
            }

            const orderData = await orderRes.json();

            // Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_demo',
                amount: orderData.amount,
                currency: 'INR',
                name: 'WeekendCamps',
                description: `Booking for ${booking.campTitle}`,
                order_id: orderData.orderId,
                prefill: {
                    name: booking.customerName,
                    email: booking.customerEmail,
                    contact: booking.customerPhone,
                },
                theme: {
                    color: '#10b981',
                },
                handler: async function (response: any) {
                    // Verify payment
                    const verifyRes = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            bookingId: booking.bookingId,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                        }),
                    });

                    if (verifyRes.ok) {
                        router.push(`/booking/success/${booking.bookingId}`);
                    } else {
                        router.push(`/booking/failure/${booking.bookingId}`);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setProcessing(false);
                        toast.error('Payment cancelled');
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            toast.error('Payment initialization failed');
            setProcessing(false);
        }
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

    if (!booking) {
        return null;
    }

    const paymentMethods = [
        { id: 'upi', name: 'UPI', icon: Smartphone, description: 'PhonePe, Google Pay, Paytm' },
        { id: 'card', name: 'Card', icon: CreditCard, description: 'Credit/Debit Card' },
        { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
        { id: 'wallet', name: 'Wallet', icon: Wallet, description: 'Paytm, PhonePe, Amazon Pay' },
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Summary
                    </button>

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Payment</h1>
                        <p className="text-gray-600">Choose your preferred payment method</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Payment Methods */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h3>

                                <div className="space-y-3">
                                    {paymentMethods.map((method) => {
                                        const Icon = method.icon;
                                        return (
                                            <button
                                                key={method.id}
                                                onClick={() => setSelectedMethod(method.id)}
                                                className={`w-full p-4 rounded-xl border-2 transition-all ${selectedMethod === method.id
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-lg ${selectedMethod === method.id ? 'bg-primary text-white' : 'bg-gray-100'
                                                        }`}>
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="font-semibold text-gray-900">{method.name}</div>
                                                        <div className="text-sm text-gray-600">{method.description}</div>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border-2 ${selectedMethod === method.id
                                                            ? 'border-primary bg-primary'
                                                            : 'border-gray-300'
                                                        }`}>
                                                        {selectedMethod === method.id && (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <div className="w-2 h-2 bg-white rounded-full" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Security Info */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-500 p-3 rounded-lg">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Secure Payment</h4>
                                        <p className="text-sm text-gray-700">
                                            Your payment is secured with 256-bit SSL encryption. We never store your card details.
                                            Powered by Razorpay - India's most trusted payment gateway.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

                                <div className="space-y-3 mb-6">
                                    <div>
                                        <div className="text-sm text-gray-600">Booking ID</div>
                                        <div className="font-semibold">{booking.bookingId}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">Camp</div>
                                        <div className="font-semibold">{booking.campTitle}</div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t-2 mb-6">
                                    <span>Total</span>
                                    <span>₹{booking.totalAmount.toLocaleString()}</span>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={processing}
                                    className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        `Pay ₹${booking.totalAmount.toLocaleString()}`
                                    )}
                                </button>

                                <div className="mt-4 text-center text-xs text-gray-500">
                                    By proceeding, you agree to our Terms & Conditions
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
