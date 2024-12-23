import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import { mongoStatusRoute } from './routes/system.routes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use(cors()); // CORS support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://3bdelrahmanibrahim:kGoy8SIisGBX2OLa@tagify.jxpsa.mongodb.net/';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('📦 Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Routes
app.use('/api/users', userRoutes);
app.get('/api/mongo-status', mongoStatusRoute);
app.get('/api/welcome', (req, res) => res.json({ message: 'Welcome to API Version 2' }));

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Performing graceful shutdown...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('💤 MongoDB connection closed.');
      process.exit(0);
    });
  });
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});

export default app;