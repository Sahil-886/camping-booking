import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'WeekendCamps - Best Camping Near Pune & Mumbai',
    description: 'Book your perfect camping experience at lakeside, hilltop, and riverside locations near Pune and Mumbai. Adventure awaits!',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <WhatsAppButton />
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
