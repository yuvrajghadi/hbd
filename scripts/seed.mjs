import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

// Load .env.local if present
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

async function seed() {
  loadEnv();

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'hbd_memories';

  if (!uri || uri.includes('<username>') || uri.trim().length === 0) {
    console.error('❌ MONGODB_URI is not set in .env.local or contains placeholders.');
    console.log('👉 Please set a valid MongoDB Atlas connection string in .env.local first:');
    console.log('   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hbd_memories?retryWrites=true&w=majority');
    process.exit(1);
  }

  console.log('🔄 Connecting to MongoDB Atlas...');
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas successfully!');

    const db = client.db(dbName);
    const collection = db.collection('media');

    // Create index
    await collection.createIndex({ displayOrder: 1 });
    await collection.createIndex({ filename: 1 }, { unique: true });

    const mediaList = JSON.parse(fs.readFileSync('scripts/generated_media.json', 'utf8'));
    console.log(`📦 Seeding ${mediaList.length} media records...`);

    const now = new Date();
    let processed = 0;

    for (const item of mediaList) {
      const updateDoc = {
        ...item,
        updatedAt: now,
      };

      await collection.updateOne(
        { filename: item.filename },
        {
          $set: updateDoc,
          $setOnInsert: { createdAt: now },
        },
        { upsert: true }
      );
      processed++;
    }

    const total = await collection.countDocuments();
    console.log(`🎉 Seeding complete! Successfully synced ${processed} media records to database: "${dbName}".`);
    console.log(`📊 Total records in 'media' collection: ${total}`);
  } catch (err) {
    const sanitizedMsg = err.message.replace(/\/\/.*@/, '//***:***@');
    console.error('❌ MongoDB Seeding Error:', sanitizedMsg);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
