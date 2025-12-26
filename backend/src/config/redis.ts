import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: false,
};

export const redisClient = new Redis(redisConfig);

redisClient.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redisClient.on('error', (error) => {
  console.error('❌ Redis connection error:', error);
});

export default redisClient;