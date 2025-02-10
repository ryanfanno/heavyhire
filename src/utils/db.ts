import mongoose, { Connection } from 'mongoose';

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Connection> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        cached!.conn = mongoose.connection;
        return cached!.conn;
      });
  }

  try {
    if (!cached?.promise) {
      throw new Error('Connection promise not initialized');
    }
    const conn = await cached.promise;
    if (!conn) {
      throw new Error('Connection failed');
    }
    return conn;
  } catch (e) {
    if (cached) {
      cached.promise = null;
    }
    throw e;
  }
} 