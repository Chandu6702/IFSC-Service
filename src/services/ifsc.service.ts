import axios from "axios";
import { IfscModel } from "../models/ifsc.model";
import { redis, config } from "../config/config";

export class IfscService {
  static async findByCode(code: string) {
    const ifsc = code.toUpperCase().trim();

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      throw new Error("Invalid IFSC format");
    }

    const cacheKey = `ifsc:${ifsc}`;

    // Check Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(`[CACHE HIT] Serving IFSC ${ifsc} from Redis`);
      return JSON.parse(cached);
    }

    // Check MongoDB
    const doc = await IfscModel.findOne({ IFSC: ifsc });
    if (doc && this.isFresh(doc.updatedAt)) {
      console.log(`[DB HIT] Serving IFSC ${ifsc} from MongoDB`);
      await redis.set(cacheKey, JSON.stringify(doc), "EX", config.cacheTtl);
      return doc;
    }

    //Fetch from external API
    console.log(`[API CALL] Fetching IFSC ${ifsc} from Razorpay API...`);
    const data = await this.fetchFromApi(ifsc);
    if (!data) return null;

    const updated = await IfscModel.findOneAndUpdate(
      { IFSC: ifsc },
      { $set: data },
      { new: true, upsert: true }
    );

    console.log(`[DB UPDATE] Saved IFSC ${ifsc} details to MongoDB`);

    await redis.set(cacheKey, JSON.stringify(updated), "EX", config.cacheTtl);
    console.log(`[CACHE SET] Stored IFSC ${ifsc} in Redis for ${config.cacheTtl}s`);

    return updated;
  }

  private static isFresh(lastUpdated: Date) {
    const age = Date.now() - lastUpdated.getTime();
    const max = config.staleDays * 24 * 60 * 60 * 1000;
    return age < max;
  }

  private static async fetchFromApi(ifsc: string) {
    try {
      const res = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
      return res.data;
    } catch (err: any) {
      if (err.response?.status === 404) {
        return null;
      }
      console.error(`[API ERROR] Failed to fetch IFSC ${ifsc}:`, err.message);
      throw new Error("Failed to fetch from external API");
    }
  }
}
