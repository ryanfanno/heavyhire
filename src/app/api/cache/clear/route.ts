import { connectToDatabase } from '@/utils/db';
import PlaceCache from '@/models/PlaceCache';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await connectToDatabase();
    await PlaceCache.deleteMany({});
    return NextResponse.json({ message: 'Cache cleared successfully' });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 });
  }
} 