const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

let messages = []; // Store chat messages

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Endpoint to send a message
app.get("/send", (req, res) => {
  const { name, text } = req.query;
  
  if (name && text) {
    const newMessage = { name, text };
    messages.push(newMessage); // Add message to the array
    console.log("Messages array:", messages); // Debug log
    return res.status(200).json(newMessage);
  } else {
    return res.status(400).json({ error: "Name and message are required." });
  }
});

// Endpoint to get messages
app.get("/messages", (req, res) => {
  res.json(messages); // Return all messages as JSON
});

// Start the server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});