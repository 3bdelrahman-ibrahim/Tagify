import mongoose from 'mongoose';
import { asyncHandler } from '../middleware/error.middleware.js';

export const mongoStatusRoute = asyncHandler(async (req, res) => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const status = states[mongoose.connection.readyState] || 'unknown';
  
  if (status === 'connected') {
    res.json({
      status: 'success',
      message: 'MongoDB is connected',
      details: {
        state: status,
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        port: mongoose.connection.port
      }
    });
  } else {
    res.status(503).json({
      status: 'error',
      message: 'MongoDB is not connected',
      details: {
        state: status,
        error: 'Database connection unavailable'
      }
    });
  }
});