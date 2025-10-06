import Redis from "ioredis";

// Check for the CI environment variable set by GitHub Actions
const isCI = process.env.CI === 'true';

// Initialize the Redis client only if we are NOT in the CI environment
let redis: Redis | undefined;

if (!isCI) {
    // Attempt to connect using the environment variable
    const redisUrl = process.env.REDIS_URL;
    
    if (redisUrl) {
        // We still use 'as string' because we checked that redisUrl is truthy
        redis = new Redis(redisUrl as string); 
        
        // OPTIONAL: Add an error listener to prevent unhandled errors from crashing a production environment
        redis.on('error', (err) => {
            console.error('Redis connection error (production/dev):', err);
            // In a real scenario, you might want to stop using the client here
        });
        
    } else {
        console.warn("REDIS_URL is not set. Rate limiting will be disabled.");
        // 'redis' remains undefined, which is handled below.
    }
} else {
    // Log a message for the CI runner, confirming the bypass
    console.warn("CI environment detected. Rate Limiting is disabled for CI build checks.");
}

const REQUESTS_PER_MINUTE = 4;
const WINDOW_IN_SECONDS = 60;

// The main function must be updated to handle the 'redis' object potentially being undefined.
export const isRateLimited = async (userId: string): Promise<boolean> => {
    // 1. CRITICAL FIX: If redis client is undefined (due to CI or missing URL), bypass the limit.
    if (!redis) {
        return false; // Always allow the request in CI/No-Redis environments
    }

    // 2. Only proceed with rate limiting if the client is connected.
    const key = `rate_limit:${userId}`;

    // Atomically increment the key's value.
    // The 'as Redis' cast is no longer needed since we check for 'redis' existence above.
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