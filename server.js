// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection using environment variable
mongoose.connect('mongodb+srv://3bdelrahmanibrahim:kGoy8SIisGBX2OLa@tagify.jxpsa.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// API Version 2 Route
app.get('/api/welcome', (req, res) => {
  res.send('Welcome to API Version 2');
});

// MongoDB Connection Status Route
app.get('/api/mongo-status', (req, res) => {
  // Check if mongoose is connected
  if (mongoose.connection.readyState === 1) {
    // 1 means connected
    res.status(200).send('mongo true');
  } else {
    // Any other state means not connected
    res.status(500).send('mongo false');
  }
});

// Get All Users (GET)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).send('No users found');
    }

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving users: ' + error.message);
  }
});

// Get User by ID (GET)
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('Invalid user ID format');
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving user: ' + error.message);
  }
});

// User Creation Route (POST)
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).send('Name, email, and password are required');
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating user: ' + error.message);
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
