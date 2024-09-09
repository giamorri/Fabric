const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // To allow requests from React frontend
const app = express();
const port = 5000;

// Allow cross-origin requests (CORS)
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database: ', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// Example API endpoint to get all users
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// Example API endpoint to add a new user
app.post('/api/users', (req, res) => {
  const { username, email, password } = req.body;
  db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, password],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'User created',
        userId: this.lastID,
      });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
