import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Cache the connection on the global object so HMR doesn't create new connections
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000, // 8 sec mein fail, 30 sec nahi
      connectTimeoutMS: 8000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // reset so next call retries
    throw err;             // let the API handler return a proper 500
  }

  return cached.conn;
}
