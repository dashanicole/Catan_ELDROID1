const { clear } = require('console');
const express = require('express');
const fs = require('fs');
const port = 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Function to read users from users.json
const getUsers = () => {
    const data = fs.readFileSync('./users.json', 'utf8');
    return JSON.parse(data);
};

// Function to write users to users.json
const saveUsers = (users) => {
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
};

// Get user list (read from the JSON file)
app.get('/userlist', (req, res) => {
    const users = getUsers();
    res.json(users);
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
        // Username doesn't exist
        return res.status(401).json({ message: 'Login Failed: User does not exist!' });
    } else if (user.password !== password) {
        // Password incorrect, clear only the password
        return res.status(401).json({ message: 'Login Failed: Incorrect password!'});
    } else {
        // Successful login
        return res.status(200).json({ message: 'Login Accepted' });
    }
});

// Register new user route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Add new user to the list and save to users.json
    users.push({ username, password });
    saveUsers(users);

    return res.status(201).json({ message: 'User registered successfully' });
});

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
    console.log('listening at port:' + port);
});