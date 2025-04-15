import sql from 'mssql';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser'

import userReq from './crud/user.js'

dotenv.config();

const API_PORT = process.env.API_PORT || 3000;

// ENSURE ENV VARIABLES EXIST
const requiredEnvVars = ['USERNAME', 'PASS', 'SERVER', 'DATABASE'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const config = {
  user: process.env.USERNAME,
  password: process.env.PASS,
  server: process.env.SERVER,
  port: parseInt(process.env.SQL_PORT || '1433'), // Always the latter
  database: process.env.DATABASE,
  authentication: {
    type: 'default'
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
};

let pool = null;
const app = express();
app.use(bodyParser.json());

// Allows connection to database, for CRUD operations
export const connectToDatabase = async() => {
    try {
    pool = await sql.connect(config);
    console.log("Database successfully connected!");
    return pool;
  } catch (err) {
    console.error("Database connection error:", err.message);
    throw err;
  }
};

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(API_PORT, () => {
      console.log(`Server running on port ${API_PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}
app.use('/', userReq);
startServer();