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

// POST route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body

  // Find the user in the array
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    // If user exists and credentials match
    return res.status(200).json({ message: 'Login Accepted' });
  } else {
    // If user does not exist or credentials don't match
    return res.status(401).json({ message: 'Login Failed' });
  }
});

// Default route for root access (optional, adjust as needed)
app.get('/', (req, res) => {
  res.send('Welcome to the Express server');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});