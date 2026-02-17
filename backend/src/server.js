import { errorHandler, notFoundHandler } from './middleware/auth.js';

import { config } from './config/env.js';
import connectDB from './config/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import learningMaterialRoutes from './routes/learningMaterialRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

// Import routes




dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database (with graceful failure)
let dbConnected = false;
connectDB()
  .then(() => {
    dbConnected = true;
    console.log('✅ Database connection successful');
  })
  .catch((error) => {
    console.warn('⚠️ Database connection failed - running in demo mode');
    console.warn(`   ${error.message}`);
    console.warn('   To fix: Install MongoDB or use MongoDB Atlas');
  });

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/learning-materials', learningMaterialRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EduSmart API is running',
    databaseConnected: dbConnected,
    mode: dbConnected ? 'production' : 'demo',
    timestamp: new Date().toISOString(),
  });
});

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 EduSmart Backend Server running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

export default app;
