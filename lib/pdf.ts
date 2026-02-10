import { jsPDF } from 'jspdf';

export interface InvoiceData {
    bookingId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    campTitle: string;
    bookingDate: string;
    adults: number;
    children: number;
    pricePerAdult: number;
    pricePerChild: number;
    totalAmount: number;
    createdAt: string;
}

export function generateInvoicePDF(data: InvoiceData): Buffer {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(24);
    doc.setTextColor(22, 163, 74); // primary-600
    doc.text('WeekendCamps', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Your Adventure Partner', 20, 27);

    // Invoice Title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('BOOKING INVOICE', 20, 45);

    // Booking ID
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Booking ID: ${data.bookingId}`, 20, 55);
    doc.text(`Date: ${data.createdAt}`, 20, 62);

    // Customer Details
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Customer Details', 20, 80);

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(`Name: ${data.customerName}`, 20, 90);
    doc.text(`Email: ${data.customerEmail}`, 20, 97);
    doc.text(`Phone: ${data.customerPhone}`, 20, 104);

    // Booking Details
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Booking Details', 20, 122);

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(`Camp: ${data.campTitle}`, 20, 132);
    doc.text(`Date: ${data.bookingDate}`, 20, 139);

    // Pricing Table
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Pricing Breakdown', 20, 157);

    // Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 165, 170, 10, 'F');
    doc.setFontSize(11);
    doc.text('Description', 25, 172);
    doc.text('Quantity', 100, 172);
    doc.text('Price', 140, 172);
    doc.text('Total', 170, 172);

    // Table Rows
    let y = 182;
    doc.setTextColor(60, 60, 60);

    // Adults
    doc.text('Adults', 25, y);
    doc.text(data.adults.toString(), 100, y);
    doc.text(`₹${data.pricePerAdult}`, 140, y);
    doc.text(`₹${data.adults * data.pricePerAdult}`, 170, y);

    // Children
    if (data.children > 0) {
        y += 10;
        doc.text('Children', 25, y);
        doc.text(data.children.toString(), 100, y);
        doc.text(`₹${data.pricePerChild}`, 140, y);
        doc.text(`₹${data.children * data.pricePerChild}`, 170, y);
    }

    // Total
    y += 15;
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(22, 163, 74);
    doc.text('TOTAL AMOUNT:', 100, y);
    doc.text(`₹${data.totalAmount}`, 170, y);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for choosing WeekendCamps!', 20, 260);
    doc.text('For queries: ' + process.env.ADMIN_EMAIL, 20, 267);
    doc.text('Phone: ' + process.env.NEXT_PUBLIC_CONTACT_PHONE, 20, 274);

    // Return as buffer
    return Buffer.from(doc.output('arraybuffer'));
}

export function generateChecklistPDF(): Buffer {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(24);
    doc.setTextColor(22, 163, 74);
    doc.text('Camping Checklist', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Essential items for your camping trip', 20, 30);

    // Clothing Section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Clothing', 20, 45);

    const clothingItems = [
        '☐ Comfortable t-shirts (2-3)',
        '☐ Long pants/jeans',
        '☐ Light jacket or hoodie',
        '☐ Comfortable walking shoes',
        '☐ Extra pair of socks',
        '☐ Sleepwear',
        '☐ Swimwear (if applicable)',
    ];

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    let y = 55;
    clothingItems.forEach(item => {
        doc.text(item, 25, y);
        y += 7;
    });

    // Essentials Section
    y += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Essentials', 20, y);

    const essentialItems = [
        '☐ Valid ID proof',
        '☐ Mobile phone & charger',
        '☐ Power bank',
        '☐ Torch/flashlight',
        '☐ Personal medications',
        '☐ Water bottle',
        '☐ Sunglasses',
        '☐ Hat or cap',
    ];

    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    essentialItems.forEach(item => {
        doc.text(item, 25, y);
        y += 7;
    });

    // Protection Section
    y += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Protection', 20, y);

    const protectionItems = [
        '☐ Sunscreen (SPF 30+)',
        '☐ Mosquito repellent',
        '☐ Hand sanitizer',
        '☐ Wet wipes',
        '☐ First aid kit',
        '☐ Face masks',
    ];

    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    protectionItems.forEach(item => {
        doc.text(item, 25, y);
        y += 7;
    });

    // Optional Section
    y += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Optional (Nice to Have)', 20, y);

    const optionalItems = [
        '☐ Camera',
        '☐ Binoculars',
        '☐ Playing cards/games',
        '☐ Musical instrument',
        '☐ Books/magazines',
    ];

    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    optionalItems.forEach(item => {
        doc.text(item, 25, y);
        y += 7;
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Happy Camping! - WeekendCamps Team', 20, 280);

    return Buffer.from(doc.output('arraybuffer'));
}
