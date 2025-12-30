import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import { AppDataSource } from './config/data-source';
import { redisClient } from './config/redis';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 5432;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Graceful shutdown handling
const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);
  
  try {
    // Close HTTP server
    if (server) {
      server.close(() => {
        logger.info('HTTP server closed');
      });
    }

    // Close database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info('Database connection closed');
    }

    // Close Redis connection
    await redisClient.quit();
    logger.info('Redis connection closed');

    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start server
const startServer = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    logger.info('✅ Database connected successfully');

    // Test Redis connection
    await redisClient.ping();
    logger.info('✅ Redis connected successfully');

    // Start HTTP server
    const server = app.listen(PORT, () => {
      logger.info(`
        🚀 Server is running!
        ✅ Environment: ${NODE_ENV}
        ✅ Port: ${PORT}
        ✅ Health: http://localhost:${PORT}/health
        ✅ API Docs: http://localhost:${PORT}/api-docs
        ✅ Metrics: http://localhost:${PORT}/metrics
        ✅ Time: ${new Date().toISOString()}
      `);
    });

    // Set up graceful shutdown
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle server errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use`);
        process.exit(1);
      } else {
        logger.error('Server error:', error);
        process.exit(1);
      }
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
let server: any;
startServer().then((s) => {
  server = s;
});