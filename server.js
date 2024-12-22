
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// API Version 2 Routes
app.get('/api/welcome', (req, res) => {
  try {
    res.send('Welcome to API Version 2');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    isConnected = mongoose.connection.readyState === 1;
  }
}

// MongoDB Connection Status Route
app.get('/api/mongo-status', async (req, res) => {
  try {
    // Reconnect if not connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    if (mongoose.connection.readyState === 1) {
      res.status(200).send('MongoDB is connected');
    } else {
      res.status(500).send({
        message: 'Error checking MongoDB status',
        error: 'MongoDB is not connected',
      });
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    res.status(500).send({
      message: 'Error checking MongoDB status',
      error: err.message,
    });
  }
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
