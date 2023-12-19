const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// In-memory database for simplicity (replace this with a database in a real-world application)
const users = [];

// Endpoint to register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user in the in-memory database
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// Endpoint to log in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the in-memory database
  const user = users.find((user) => user.username === username);

  // If the user is not found, or the password is incorrect, return an error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
