const express = require('express');
const cors = require('cors'); // Import CORS for cross-origin requests
const port = 5000;
const app = express();

// Array of users for login purposes
const users = [
  {
    'username': 'admin',
    'password': 'user',
  },
  {
    'username': 'hello',
    'password': 'world',
  },
  {
    'username': 'dennis',
    'password': 'durano',
  },
  {
    'username': 'julio',
    'password': 'so',
  },
];

// Middleware to handle JSON requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use CORS to allow requests from different origins (like React Native apps)
app.use(cors());

// Serving static files if needed
app.use(express.static('public'));

// GET route to return the list of users
app.get('/users', (req, res) => {
  return res.status(200).json(users);
});

// Default route for root access (optional, adjust as needed)
app.get('/', (req, res) => {
  res.send('Welcome to the Express server');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});