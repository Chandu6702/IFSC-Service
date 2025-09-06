import dotenv from "dotenv";
import mongoose from "mongoose";
import Redis from "ioredis";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/ifsc",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  cacheTtl: Number(process.env.CACHE_TTL_SECONDS || 60), 
  staleDays: Number(process.env.STALE_DAYS || 30)
};

export async function connectMongo() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo connection failed", err);
    process.exit(1);
  }
}

export const redis = new Redis(config.redisUrl);
