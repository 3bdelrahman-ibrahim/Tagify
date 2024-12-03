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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// API Version 2 Route
app.get('/api/welcome', (req, res) => {
  res.send('Welcome to API Version 2');
});

// Get User by ID (GET)
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('Invalid user ID format');
    }

    // Find the user by ID
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
