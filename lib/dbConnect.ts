import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable')
}

interface MongooseCache {
    promise: Promise<typeof mongoose> | null
    conn: typeof mongoose | null
}

declare global {
    var mongoose: MongooseCache
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export { dbConnect }