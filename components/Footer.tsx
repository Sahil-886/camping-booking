import Link from 'next/link';
import { Tent, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                                <Tent className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">WeekendCamps</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your gateway to unforgettable camping experiences near Pune and Mumbai.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.facebook.com/profile.php?id=61571046990395"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/10 hover:bg-primary rounded-lg transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/weekend.camps"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/10 hover:bg-primary rounded-lg transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/camps" className="text-gray-400 hover:text-primary transition-colors">
                                    All Camps
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-gray-400 hover:text-primary transition-colors">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/blogs" className="text-gray-400 hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Popular Camps</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/camps/pawna-lake-camping"
                                    className="text-gray-400 hover:text-primary transition-colors"
                                >
                                    Pawna Lake Camping
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/camps/lonavala-hill-camping"
                                    className="text-gray-400 hover:text-primary transition-colors"
                                >
                                    Lonavala Hilltop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/camps/riverside-camping"
                                    className="text-gray-400 hover:text-primary transition-colors"
                                >
                                    Riverside Camping
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-gray-400">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                                <a href="mailto:dabhadetejas165@gmail.com" className="hover:text-primary transition-colors">
                                    dabhadetejas165@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                                <a href="tel:+918530160937" className="hover:text-primary transition-colors">
                                    +91 8530160937
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                                <span>Pune, Maharashtra, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>© {currentYear} WeekendCamps. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
