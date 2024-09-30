const express = require('express');
const fs = require('fs');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();
app.use(cors());
app.use(express.json());

// Read users from JSON file
let users = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);
  
  if (user) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid username or password' });
  }
});

// Registration route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).send({ message: 'User already exists' });
  }

  // Add new user to the array and update the JSON file
  users.push({ username, password });
  fs.writeFileSync('./data.json', JSON.stringify(users));
  res.status(201).send({ message: 'User registered successfully' });
});

// Middleware for unexpected routes
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
