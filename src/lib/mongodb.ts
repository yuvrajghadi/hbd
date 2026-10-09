import { MongoClient, Db, MongoClientOptions } from 'mongodb';

/**
 * Reusable, singleton MongoDB client connection utility for Next.js.
 * Caches connection in development across HMR to avoid connection exhaustion.
 * Credentials and URI are NEVER hardcoded or printed to logs.
 */

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'hbd_memories';

const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured(): boolean {
  return Boolean(uri && uri.trim().length > 0 && !uri.includes('<username>'));
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!isMongoConfigured()) {
    throw new Error('MONGODB_URI is not configured in environment variables.');
  }

  const validUri = uri as string;

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the MongoClient is not recreated on every HMR reload
    if (!global._mongoClientPromise) {
      client = new MongoClient(validUri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable
    if (!clientPromise) {
      client = new MongoClient(validUri, options);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

export async function getMongoDb(): Promise<Db> {
  const clientInstance = await getMongoClient();
  return clientInstance.db(dbName);
}

/**
 * Test the database connection securely without leaking connection strings or credentials.
 */
export async function testMongoConnection(): Promise<{ connected: boolean; message: string }> {
  if (!isMongoConfigured()) {
    return {
      connected: false,
      message: 'MONGODB_URI is not set or contains placeholder values in .env.local',
    };
  }

  try {
    const db = await getMongoDb();
    await db.command({ ping: 1 });
    return {
      connected: true,
      message: 'MongoDB Atlas connected successfully.',
    };
  } catch (error: unknown) {
    const safeError = error instanceof Error ? error.message : 'Unknown database error';
    // Ensure no password or URI is leaked in error messages
    const sanitizedError = safeError.replace(/\/\/.*@/, '//***:***@');
    return {
      connected: false,
      message: `MongoDB connection error: ${sanitizedError}`,
    };
  }
}

export default getMongoClient;
