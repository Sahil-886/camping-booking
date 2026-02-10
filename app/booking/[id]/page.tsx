import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, MapPin, Calendar, Users, IndianRupee, Mail, Phone, Download, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getBookingData(id: string) {
    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/bookings/${id}`,
            { cache: 'no-store' }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        return null;
    }
}

export default async function BookingConfirmationPage({ params }: { params: { id: string } }) {
    const booking = await getBookingData(params.id);

    if (!booking) {
        notFound();
    }

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="container mx-auto px-4 py-12">
                    {/* Success Message */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Booking Confirmed!
                            </h1>
                            <p className="text-xl text-gray-600 mb-6">
                                Your camping adventure is all set. We've sent a confirmation email to{' '}
                                <span className="font-semibold text-primary">{booking.customer.email}</span>
                            </p>
                            <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
                                <span className="text-sm text-gray-600">Booking ID:</span>
                                <span className="text-lg font-bold text-gray-900">{booking.bookingId}</span>
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[booking.status as keyof typeof statusColors]}`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>

                            <div className="space-y-6">
                                {/* Camp Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Camp Information</h3>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-lg flex-shrink-0"></div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-2">{booking.camp.title}</h4>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{booking.camp.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Date and Guests */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Date</h3>
                                        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <span className="text-gray-700">
                                                {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Guests</h3>
                                        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                                            <Users className="w-5 h-5 text-primary" />
                                            <span className="text-gray-700">
                                                {booking.persons.adults} Adult{booking.persons.adults > 1 ? 's' : ''}
                                                {booking.persons.children > 0 && `, ${booking.persons.children} Child${booking.persons.children > 1 ? 'ren' : ''}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-primary" />
                                            <span className="text-gray-700">{booking.customer.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-primary" />
                                            <span className="text-gray-700">{booking.customer.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Summary */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Summary</h3>
                                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-gray-700">Total Amount</span>
                                            <div className="flex items-center gap-1 text-3xl font-bold text-gray-900">
                                                <IndianRupee className="w-6 h-6" />
                                                {booking.totalAmount}
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-300">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Payment Status</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.paymentStatus === 'paid'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-shadow">
                                    <Download className="w-5 h-5" />
                                    <span className="font-semibold">Download Invoice</span>
                                </button>
                                <button className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                                    <FileText className="w-5 h-5" />
                                    <span className="font-semibold">Download Checklist</span>
                                </button>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
                            <p className="text-lg opacity-90 mb-6">
                                We'll send you a reminder 2 days before your trip with all the details you need.
                                Get ready for an amazing adventure!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/camps"
                                    className="px-8 py-3 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    Explore More Camps
                                </Link>
                                <Link
                                    href="/"
                                    className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold hover:bg-white/20 transition-colors"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
