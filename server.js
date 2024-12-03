const express = require('express');
const app = express();
const port = 3000;

// API Version 1 Route
app.get('/api/v1/welcome', (req, res) => {
  res.send('Welcome to API Version 1');
});

// API Version 2 Route
app.get('/api/v2/welcome', (req, res) => {
  res.send('Welcome to API Version 2');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
