import { NextRequest, NextResponse } from 'next/server';
import { fetchWeatherData } from '@/lib/utils';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location') || 'Lonavala';

        const weather = await fetchWeatherData(location);

        if (!weather) {
            return NextResponse.json(
                { success: false, error: 'Weather data not available' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: weather,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
