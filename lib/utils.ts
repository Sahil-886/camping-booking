import { format } from 'date-fns';

export function generateBookingId(): string {
    const date = new Date();
    const dateStr = format(date, 'yyyyMMdd');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `BK${dateStr}${random}`;
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date: Date | string): string {
    return format(new Date(date), 'dd MMM yyyy');
}

export function formatDateTime(date: Date | string): string {
    return format(new Date(date), 'dd MMM yyyy, hh:mm a');
}

export function calculateTotalPrice(adults: number, children: number, adultPrice: number, childPrice: number): number {
    return (adults * adultPrice) + (children * childPrice);
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
    const phoneRegex = /^[+]?[\d\s-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export async function fetchWeatherData(location: string) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location},IN&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return {
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
        };
    } catch (error) {
        console.error('Weather fetch error:', error);
        return null;
    }
}
