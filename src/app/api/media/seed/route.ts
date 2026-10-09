import { NextRequest, NextResponse } from 'next/server';
import { seedMediaRecords } from '@/lib/db/media';
import { isMongoConfigured } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST() {
  return handleSeed();
}

export async function GET() {
  return handleSeed();
}

async function handleSeed() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'MONGODB_URI is not configured in .env.local. Please set a valid MongoDB Atlas connection string before seeding.',
        },
        { status: 400 }
      );
    }

    const result = await seedMediaRecords();

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount,
      totalRecords: result.totalRecords,
      message: result.message,
    });
  } catch (error: unknown) {
    const safeError = error instanceof Error ? error.message : 'Seeding failed';
    return NextResponse.json(
      {
        success: false,
        error: safeError.replace(/\/\/.*@/, '//***:***@'),
      },
      { status: 500 }
    );
  }
}
