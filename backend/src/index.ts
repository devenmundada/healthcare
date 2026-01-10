import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import { AppDataSource } from './config/data-source';
import { redisClient } from './config/redis';
import { logger } from './utils/logger';

const PORT = Number(process.env.PORT || 8080);
const NODE_ENV = process.env.NODE_ENV || 'development';

// Graceful shutdown handling
const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  try {
    if (server) {
      server.close(() => {
        logger.info('HTTP server closed');
      });
    }

    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info('Database connection closed');
    }

    await redisClient.quit();
    logger.info('Redis connection closed');

    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const startServer = async () => {
  try {
    logger.info(`Using DATABASE_URL: ${Boolean(process.env.DATABASE_URL)}`);

    await AppDataSource.initialize();
    logger.info('✅ Database connected successfully');

    await redisClient.ping();
    logger.info('✅ Redis connected successfully');

    const server = app.listen(PORT, () => {
      logger.info(`
🚀 Server is running!
Environment: ${NODE_ENV}
Port: ${PORT}
Health: /api/health
Time: ${new Date().toISOString()}
      `);
    });

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use`);
        process.exit(1);
      }
      logger.error('Server error:', error);
      process.exit(1);
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

let server: any;
startServer().then((s) => {
  server = s;
});
