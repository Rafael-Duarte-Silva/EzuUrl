import { createClient } from "redis";

export const redisClient = createClient();

export async function connectRedis(): Promise<void> {
    redisClient.on("error", (err) => console.log("Redis Client Error", err));

    await redisClient.connect();
    console.log("Connected to Redis");
}

