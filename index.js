
// // File: server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/users', require('./routes/users'));

// // Basic route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the API' });
// });

// // Handle 404 errors
// app.use((req, res) => {
//   res.status(404).json({ 
//     error: 'Not Found',
//     availableRoutes: [
//       {
//         path: '/',
//         method: 'GET',
//         description: 'Welcome message'
//       },
//       {
//         path: '/api/users',
//         method: 'GET',
//         description: 'Get all users'
//       },
//       {
//         path: '/api/users/:id',
//         method: 'GET',
//         description: 'Get user by ID'
//       },
//       {
//         path: '/api/users',
//         method: 'POST',
//         description: 'Create new user'
//       },
//       {
//         path: '/api/users/:id',
//         method: 'PUT',
//         description: 'Update user'
//       },
//       {
//         path: '/api/users/:id',
//         method: 'DELETE',
//         description: 'Delete user'
//       }
//     ]
//   });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
 //   console.log('Server is running on http://localhost:3000');
    // });

// // File: models/User.js

// // File: routes/users.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to Node.js!');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
