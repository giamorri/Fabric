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

    // Create users table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
      } else {
        console.log('Users created or already exists');
      }
    });
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to get all users
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// API endpoint to add a new user (sign up)
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

// Sign-in endpoint
app.post('/api/signin', (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const query = `SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?`;
  
  db.get(query, [usernameOrEmail, usernameOrEmail, password], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    
    if (row) {
      res.json({ message: 'Sign in successful', user: row });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
