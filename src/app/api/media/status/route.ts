import { NextResponse } from 'next/server';
import { testMongoConnection, isMongoConfigured } from '@/lib/mongodb';
import { getMongoDb } from '@/lib/mongodb';
import { MEDIA_COLLECTION } from '@/lib/db/media';

export const dynamic = 'force-dynamic';

export async function GET() {
  const configured = isMongoConfigured();
  const testResult = await testMongoConnection();

  let count = 0;
  if (testResult.connected) {
    try {
      const db = await getMongoDb();
      count = await db.collection(MEDIA_COLLECTION).countDocuments();
    } catch {
      // Ignore count error
    }
  }

  return NextResponse.json({
    isConfigured: configured,
    isConnected: testResult.connected,
    message: testResult.message,
    mediaRecordsInDb: count,
  });
}
