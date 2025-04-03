import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000, // Increased timeout
  socketTimeoutMS: 45000,
  connectTimeoutMS: 20000, // Increased timeout
  retryWrites: true,
  retryReads: true,
  w: 'majority',
  maxIdleTimeMS: 120000,
  ssl: process.env.NODE_ENV === 'production',
  tls: process.env.NODE_ENV === 'production',
  tlsInsecure: process.env.NODE_ENV === 'development',
  directConnection: process.env.NODE_ENV === 'development'
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function connectWithRetry(retries = MAX_RETRIES): Promise<MongoClient> {
  try {
    if (!client) {
      client = new MongoClient(uri, options);
    }

    await client.connect();
    await client.db().command({ ping: 1 }); // Test the connection
    console.log('Successfully connected to MongoDB');
    return client;
  } catch (error) {
    console.error(`MongoDB connection attempt failed (${MAX_RETRIES - retries + 1}/${MAX_RETRIES}):`, error);

    if (retries > 1) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return connectWithRetry(retries - 1);
    }

    throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getMongoClient(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the value
    // across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = connectWithRetry();
    }

    return globalWithMongo._mongoClientPromise;
  }

  // In production mode, it's best to not use a global variable.
  return connectWithRetry();
}

clientPromise = getMongoClient();

// Export a module-scoped MongoClient promise
export default clientPromise;