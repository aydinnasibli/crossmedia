import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // In production, this should probably throw an error
  // throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  console.warn("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) return null;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Fail fast if connection cannot be established
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", e);

    // Check for specific DNS SRV error
    if (e instanceof Error && (e.message.includes("querySrv") || (e as any).code === "ECONNREFUSED")) {
      console.error("\n!!! POTENTIAL FIX !!!");
      console.error("If you are seeing a 'querySrv ECONNREFUSED' error, your local network might be blocking DNS SRV lookups.");
      console.error("Please check TROUBLESHOOTING.md for the solution using the Standard Connection String.\n");
    }

    // Do not throw, return null to allow app to continue (albeit with no data)
    return null;
  }

  return cached.conn;
}

export default connectDB;
