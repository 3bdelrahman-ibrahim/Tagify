// File: server.js
import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection using environment variable
mongoose
  .connect('mongodb+srv://3bdelrahmanibrahim:kGoy8SIisGBX2OLa@tagify.jxpsa.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
  });

// Mongoose User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  profile: {
    bio: { type: String },
    socialLinks: { type: [String] },
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// API Version 2 Routes
app.get('/api/welcome', (req, res) => {
  try {
    res.send('Welcome to API Version 2');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// MongoDB Connection Status Route
app.get('/api/mongo-status', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb+srv://3bdelrahmanibrahim:kGoy8SIisGBX2OLa@tagify.jxpsa.mongodb.net/', {
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
// Get a single user by ID and render an HTML page
app.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('<h1>User not found</h1>');
    }
    // Render an HTML page with user data
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Details</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; }
          .container { max-width: 600px; margin: auto; padding: 1rem; border: 1px solid #ccc; border-radius: 5px; }
          h1 { color: #333; }
          p { margin: 0.5rem 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>User Details</h1>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Age:</strong> ${user.age || 'Not Provided'}</p>
          <h2>Profile</h2>
          <p><strong>Bio:</strong> ${user.profile?.bio || 'No bio available'}</p>
          <p><strong>Social Links:</strong></p>
          <ul>
            ${user.profile?.socialLinks?.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('') || '<li>No social links available</li>'}
          </ul>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
});

// CRUD Routes for Users
// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ message: 'Error creating user', error: err.message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching users', error: err.message });
  }
});

// Get a single user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching user', error: err.message });
  }
});

// Update a user by ID
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: 'Error updating user', error: err.message });
  }
});

// Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting user', error: err.message });
  }
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const dotenv = require('dotenv'); // Import dotenv
// // const User = require('./models/User');
// // const app = express();

// // // Load environment variables from .env file
// // dotenv.config();

// // // Middleware to parse JSON requests
// // app.use(express.json());

// // // MongoDB connection using environmssent variable
// // mongoose.connect(process.env.MONGO_URI, {
// // })
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch((err) => console.log('Error connecting to MongoDB:', err));

// // // API Version 2 Routes
// // app.get('/api/welcome', (req, res) => {
// //   res.send('Welcome to API Version 2');
// // });

// // // MongoDB Connection Status Route
// // app.get('/api/mongo-status', (req, res) => {
// //   if (mongoose.connection.readyState === 1) {
// //     res.status(200).send('MongoDB is connected');
// //   } else {
// //     res.status(500).send('MongoDB is not connected');
// //   }
// // });

// // // Get All Users (GET)
// // app.get('/api/users', async (req, res) => {
// //   try {
// //     const users = await User.find();

// //     if (users.length === 0) {
// //       return res.status(404).send('No users found');
// //     }

// //     res.status(200).json(users);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).send('Error retrieving users: ' + error.message);
// //   }
// // });

// // // Get User by ID (GET)
// // app.get('/api/users/:id', async (req, res) => {
// //   try {
// //     const userId = req.params.id;

// //     if (!mongoose.Types.ObjectId.isValid(userId)) {
// //       return res.status(400).send('Invalid user ID format');
// //     }

// //     const user = await User.findById(userId);

// //     if (!user) {
// //       return res.status(404).send('User not found');
// //     }

// //     res.status(200).json(user);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).send('Error retrieving user: ' + error.message);
// //   }
// // });

// // // User Creation Route (POST)
// // app.post('/api/users', async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
    
// //     if (!name || !email || !password) {
// //       return res.status(400).send('Name, email, and password are required');
// //     }

// //     const newUser = new User({
// //       name,
// //       email,
// //       password,
// //     });

// //     await newUser.save();
// //     res.status(201).send('User created successfully');
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).send('Error creating user: ' + error.message);
// //   }
// // });

// // // Start the server
// // app.listen(process.env.PORT, () => {
// //   console.log(`Server running on port ${process.env.PORT}`);
// // });


// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv'); 
// const app = express();

// // Load environment variables from .env file
// dotenv.config();

// // Middleware to parse JSON requests
// app.use(express.json());

// // MongoDB connection using environment variable
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1); // Exit the process if the connection fails
//   });

// // API Version 2 Routes
// app.get('/api/welcome', (req, res) => {
//   try {
//     res.send('Welcome to API Version 2');
//   } catch (err) {
//     res.status(500).send('Internal Server Error');
//   }
// });
// let isConnected = false;

// async function connectToDatabase() {
//   if (!isConnected) {
//     await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     isConnected = mongoose.connection.readyState === 1;
//   }
// }

// // MongoDB Connection Status Route
// app.get('/api/mongo-status', async (req, res) => {
//   try {
//     console.log('Checking MongoDB status...');
//     await connectToDatabase();
//     console.log('Connection state:', mongoose.connection.readyState);
//     if (mongoose.connection.readyState === 1) {
//       res.status(200).send('MongoDB is connected');
//     } else {
//       res.status(500).send('Connection state:', mongoose.connection.readyState);
//     }
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).send('Error checking MongoDB status');
//   }
// });


// // General error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });