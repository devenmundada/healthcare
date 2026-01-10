const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        database: process.env.DB_NAME || 'healthcare_db',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'root',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      }
);

// Test connection
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL Database Connected Successfully');
    console.log(`📊 Database: ${process.env.DB_NAME || 'healthcare_db'}`);
    client.release();
  })
  .catch(err => {
    console.error('❌ Database Connection Failed:', err.message);
    console.error('💡 Check DB credentials and environment variables');
  });

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  process.exit(1);
});

module.exports = pool;

// Test connection
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL Database Connected Successfully');
    console.log(`📊 Database: ${process.env.DB_NAME || 'healthcare_db'}`);
    client.release();
  })
  .catch(err => {
    console.error('❌ Database Connection Failed:', err.message);
    console.error('💡 Make sure PostgreSQL is running and credentials are correct');
  });

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  process.exit(-1);
});

module.exports = pool;