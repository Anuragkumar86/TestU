import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL as string);

const REQUESTS_PER_MINUTE = 4;
const WINDOW_IN_SECONDS = 60;

export const isRateLimited = async (userId: string): Promise<boolean> => {
    // We'll create a unique key for each user's request count in Redis.
    const key = `rate_limit:${userId}`;

    // Atomically increment the key's value.
    const currentCount = await redis.incr(key);

    // If this is the first request in the window, set the key to expire.
    if (currentCount === 1) {
        await redis.expire(key, WINDOW_IN_SECONDS);
    }
    
    // Check if the current request count exceeds the allowed limit.
    if (currentCount > REQUESTS_PER_MINUTE) {
        return true; // Blocked: too many requests.
    }

    return false; // Allowed: within the limit.
};
