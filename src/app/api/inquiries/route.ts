import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Inquiry from '@/models/Inquiry';

const MONGODB_URI = process.env.MONGODB_URI;

export async function POST(request: Request) {
  try {
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined');
    }

    await mongoose.connect(MONGODB_URI);
    
    const body = await request.json();
    const inquiry = new Inquiry(body);
    await inquiry.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to save inquiry' },
      { status: 500 }
    );
  }
} 