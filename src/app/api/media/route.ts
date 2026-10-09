import { NextRequest, NextResponse } from 'next/server';
import { getMediaRecords, addMediaRecord } from '@/lib/db/media';
import { isMongoConfigured } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const mediaType = (searchParams.get('mediaType') as 'photo' | 'video') || undefined;

    const result = await getMediaRecords({ category, mediaType });

    return NextResponse.json({
      success: true,
      data: result.media,
      total: result.total,
      source: result.source,
      isMongoConfigured: isMongoConfigured(),
      message: result.message,
    });
  } catch (error: unknown) {
    const safeError = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json(
      {
        success: false,
        error: safeError.replace(/\/\/.*@/, '//***:***@'),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || !body.title || !body.caption || !body.image) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: title, caption, and image (or url) are required.',
        },
        { status: 400 }
      );
    }

    const result = await addMediaRecord(body);

    return NextResponse.json(
      {
        success: true,
        data: result.record,
        message: result.message,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const safeError = error instanceof Error ? error.message : 'Failed to add media';
    return NextResponse.json(
      {
        success: false,
        error: safeError.replace(/\/\/.*@/, '//***:***@'),
      },
      { status: 500 }
    );
  }
}
