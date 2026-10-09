import { getMongoDb, isMongoConfigured } from '@/lib/mongodb';
import { memories as defaultMemories } from '@/data/memories';
import { Memory } from '@/types';

export const MEDIA_COLLECTION = 'media';

export interface GetMediaResult {
  media: Memory[];
  source: 'mongodb' | 'fallback';
  total: number;
  message?: string;
}

/**
 * Retrieve all photo and video records from MongoDB Atlas.
 * If MongoDB is not configured or fails to connect, gracefully falls back
 * to the default curated media list without crashing or leaking credentials.
 */
export async function getMediaRecords(filter?: {
  category?: string;
  mediaType?: 'photo' | 'video';
}): Promise<GetMediaResult> {
  // If MongoDB is not configured in .env.local, immediately use fallback
  if (!isMongoConfigured()) {
    const filtered = applyInMemoryFilter(defaultMemories, filter);
    return {
      media: filtered,
      source: 'fallback',
      total: filtered.length,
      message: 'MongoDB Atlas is not configured. Serving local curated media.',
    };
  }

  try {
    const db = await getMongoDb();
    const collection = db.collection(MEDIA_COLLECTION);

    // Build query filter
    const query: Record<string, unknown> = {};
    if (filter?.category && filter.category !== 'all') {
      if (filter.category === 'core') {
        query.$or = [{ category: 'core' }, { highlight: true }];
      } else {
        query.category = filter.category;
      }
    }
    if (filter?.mediaType) {
      query.mediaType = filter.mediaType;
    }

    const docs = await collection
      .find(query)
      .sort({ displayOrder: 1, id: 1 })
      .toArray();

    if (docs.length === 0) {
      // If collection is empty, fall back and offer seeding
      const filtered = applyInMemoryFilter(defaultMemories, filter);
      return {
        media: filtered,
        source: 'fallback',
        total: filtered.length,
        message: 'MongoDB collection is empty. Showing default media (run seeding to populate MongoDB).',
      };
    }

    // Map Mongo documents to Memory interface
    const mapped: Memory[] = docs.map((doc) => ({
      _id: doc._id.toString(),
      id: Number(doc.id) || 1,
      filename: doc.filename || '',
      url: doc.url || doc.image || '',
      image: doc.image || doc.url || '',
      mediaType: doc.mediaType || 'photo',
      videoUrl: doc.videoUrl,
      layoutSpan: doc.layoutSpan || 'normal',
      title: doc.title || 'Special Moment',
      caption: doc.caption || '',
      description: doc.description || '',
      date: doc.date,
      location: doc.location,
      animation: doc.animation || 'fade',
      storySnippet: doc.storySnippet,
      category: doc.category || 'all',
      highlight: Boolean(doc.highlight),
      displayOrder: doc.displayOrder || doc.id || 1,
      isPortrait: doc.isPortrait,
      aspectRatio: doc.aspectRatio,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));

    return {
      media: mapped,
      source: 'mongodb',
      total: mapped.length,
      message: 'Successfully loaded media from MongoDB Atlas.',
    };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Database error';
    // Sanitized log without credentials
    console.warn(`[MongoDB Warning] Could not fetch media from database (${errMsg}). Falling back to local media.`);

    const filtered = applyInMemoryFilter(defaultMemories, filter);
    return {
      media: filtered,
      source: 'fallback',
      total: filtered.length,
      message: `Database query failed. Using safe fallback: ${errMsg.replace(/\/\/.*@/, '//***:***@')}`,
    };
  }
}

/**
 * Seed all media items into MongoDB Atlas.
 * Uses upsert by filename / id to prevent duplicate records.
 */
export async function seedMediaRecords(): Promise<{
  success: boolean;
  insertedCount: number;
  totalRecords: number;
  message: string;
}> {
  if (!isMongoConfigured()) {
    throw new Error('MONGODB_URI is not set or contains placeholder values.');
  }

  const db = await getMongoDb();
  const collection = db.collection(MEDIA_COLLECTION);

  // Ensure index on displayOrder and filename
  await collection.createIndex({ displayOrder: 1 });
  await collection.createIndex({ filename: 1 }, { unique: true });

  const now = new Date();
  let processed = 0;

  for (const item of defaultMemories) {
    const updateDoc = {
      ...item,
      updatedAt: now,
    };

    await collection.updateOne(
      { filename: item.filename || item.image.replace('/photos/', '').replace('/videos/', '') },
      {
        $set: updateDoc,
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    processed++;
  }

  // Remove any documents that are no longer in defaultMemories
  const validFilenames = defaultMemories.map(
    (item) => item.filename || item.image.replace('/photos/', '').replace('/videos/', '')
  );
  await collection.deleteMany({ filename: { $nin: validFilenames } });

  const totalCount = await collection.countDocuments();

  return {
    success: true,
    insertedCount: processed,
    totalRecords: totalCount,
    message: `Successfully synced ${processed} media records to MongoDB Atlas (Collection count: ${totalCount}).`,
  };
}

/**
 * Add a new media item to MongoDB Atlas.
 */
export async function addMediaRecord(record: Partial<Memory>): Promise<{
  success: boolean;
  record?: Memory;
  message: string;
}> {
  if (!isMongoConfigured()) {
    throw new Error('MONGODB_URI is not configured in environment variables.');
  }

  if (!record.title || !record.caption || !record.image) {
    throw new Error('Title, caption, and image/url are required.');
  }

  const db = await getMongoDb();
  const collection = db.collection(MEDIA_COLLECTION);

  // Determine next id and displayOrder
  const highestDoc = await collection.find().sort({ displayOrder: -1 }).limit(1).toArray();
  const nextOrder = (highestDoc[0]?.displayOrder || highestDoc[0]?.id || defaultMemories.length) + 1;

  const now = new Date();
  const newRecord = {
    id: nextOrder,
    displayOrder: record.displayOrder ?? nextOrder,
    filename: record.filename || record.image.split('/').pop() || `media_${nextOrder}`,
    url: record.url || record.image,
    image: record.image,
    mediaType: record.mediaType || 'photo',
    videoUrl: record.videoUrl,
    layoutSpan: record.layoutSpan || (record.isPortrait ? 'tall' : 'normal'),
    title: record.title,
    caption: record.caption,
    description: record.description || '',
    date: record.date || 'Recent Moment',
    location: record.location || 'Special Memories',
    animation: record.animation || 'fade',
    category: record.category || 'candid',
    highlight: Boolean(record.highlight),
    storySnippet: record.storySnippet || record.description || '',
    isPortrait: Boolean(record.isPortrait),
    aspectRatio: record.aspectRatio || (record.isPortrait ? '3/4' : '4/3'),
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(newRecord);

  return {
    success: true,
    record: {
      ...newRecord,
      _id: result.insertedId.toString(),
    },
    message: 'Media successfully added to MongoDB Atlas.',
  };
}

function applyInMemoryFilter(
  items: Memory[],
  filter?: { category?: string; mediaType?: 'photo' | 'video' }
): Memory[] {
  return items.filter((m) => {
    if (filter?.mediaType && m.mediaType !== filter.mediaType) {
      if (filter.mediaType === 'video' && !m.videoUrl) return false;
      if (filter.mediaType === 'photo' && m.mediaType === 'video') return false;
    }
    if (filter?.category && filter.category !== 'all') {
      if (filter.category === 'core' && !(m.category === 'core' || m.highlight)) return false;
      if (filter.category === 'video' && !(m.mediaType === 'video' || m.videoUrl)) return false;
      if (filter.category === 'candid' && m.category !== 'candid') return false;
    }
    return true;
  });
}
