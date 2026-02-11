'use client';

import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const whatsappNumber = '918530160937';
    const whatsappMessage = 'Hi! I would like to know more about camping packages.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const handleQuickContact = (method: string) => {
        if (method === 'whatsapp') {
            window.open(whatsappUrl, '_blank');
        } else if (method === 'call') {
            window.location.href = 'tel:+918530160937';
        } else if (method === 'email') {
            window.location.href = 'mailto:dabhadetejas165@gmail.com';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    subject: 'General Inquiry',
                }),
            });

            if (response.ok) {
                toast.success('Message sent! We\'ll get back to you soon.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                toast.error('Failed to send. Please try WhatsApp instead.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try WhatsApp.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        We're here to help! Reach out via WhatsApp, call, or email
                    </p>
                </div>
            </section>

            {/* Quick Contact Methods */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Choose Your Preferred Way to Connect
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                        {/* WhatsApp */}
                        <button
                            onClick={() => handleQuickContact('whatsapp')}
                            className="group bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <MessageCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">WhatsApp Us</h3>
                            <p className="text-white/90 mb-4">Get instant replies on WhatsApp</p>
                            <div className="text-lg font-semibold">+91 8530160937</div>
                            <div className="mt-4 text-sm text-white/80">⚡ Fastest Response</div>
                        </button>

                        {/* Call */}
                        <button
                            onClick={() => handleQuickContact('call')}
                            className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Call Us</h3>
                            <p className="text-white/90 mb-4">Speak with our team directly</p>
                            <div className="text-lg font-semibold">+91 8530160937</div>
                            <div className="mt-4 text-sm text-white/80">📞 Mon-Sat: 9 AM - 6 PM</div>
                        </button>

                        {/* Email */}
                        <button
                            onClick={() => handleQuickContact('email')}
                            className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="bg-white/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Email Us</h3>
                            <p className="text-white/90 mb-4">Send us a detailed message</p>
                            <div className="text-sm font-semibold break-all">dabhadetejas165@gmail.com</div>
                            <div className="mt-4 text-sm text-white/80">📧 24-48 hour response</div>
                        </button>
                    </div>

                    {/* Contact Form - Compact Version */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Or Send a Quick Message</h3>
                            <p className="text-gray-600 mb-6 text-center">We'll get back to you within 24 hours</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="input"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="input"
                                    />
                                </div>

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="input"
                                />

                                <textarea
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={4}
                                    className="input resize-none"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location & Hours */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                            <p className="text-gray-600">Pune, Maharashtra, India</p>
                            <p className="text-sm text-gray-500 mt-2">Serving Pune & Mumbai regions</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Business Hours</h3>
                            <p className="text-gray-600">Monday - Saturday</p>
                            <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                            <p className="text-sm text-gray-500 mt-2">Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
