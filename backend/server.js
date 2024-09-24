const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // To allow requests from React frontend
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Allow cross-origin requests (CORS)
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/profileImages/');
    } else if (file.fieldname === 'coverImage') {
      cb(null, 'uploads/coverImages/');
    } else if (file.fieldname === 'postImage') {
      cb(null, 'uploads/postImages/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File naming with timestamp
  }
});

const upload = multer({ storage });

// Create directories if not exist
const createDirectories = () => {
  const dirs = ['uploads/profileImages', 'uploads/coverImages', 'uploads/postImages'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};
createDirectories(); // This function runs at the start to create necessary directories


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
      password TEXT,
      profileImage TEXT,
      coverImage TEXT,
      postImage TEXT
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


// API endpoint to add a new user (sign up)
// API to upload profile image
app.post('/api/upload/profileImage', upload.single('profileImage'), (req, res) => {
  const { username } = req.body;
  const imagePath = `/uploads/profileImages/${req.file.filename}`;
  
  db.run(`UPDATE users SET profileImage = ? WHERE username = ?`, [imagePath, username], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save profile image in database' });
    }
    res.json({ message: 'Profile image uploaded successfully', imagePath });
  });
});

// API to upload cover image
app.post('/api/upload/coverImage', upload.single('coverImage'), (req, res) => {
  const { username } = req.body;
  const imagePath = `/uploads/coverImages/${req.file.filename}`;
  
  db.run(`UPDATE users SET coverImage = ? WHERE username = ?`, [imagePath, username], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save cover image in database' });
    }
    res.json({ message: 'Cover image uploaded successfully', imagePath });
  });
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
      res.json({
        message: 'Login successful',
        user: {
          username: row.username,
          email: row.email,
          profileImage: row.profileImage,
          coverImage: row.coverImage,
        },
      });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  });
});



// API to upload profile image
app.post('/api/upload/profileImage', upload.single('profileImage'), (req, res) => {
  const { username } = req.body;
  const imagePath = `/uploads/profileImages/${req.file.filename}`;
  
  db.run(`UPDATE users SET profileImage = ? WHERE username = ?`, [imagePath, username], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save profile image in database' });
    }
    res.json({ message: 'Profile image uploaded successfully', imagePath });
  });
});


// API to upload cover image
app.post('/api/upload/coverImage', upload.single('coverImage'), (req, res) => {
  const { username } = req.body;
  const imagePath = `/uploads/coverImages/${req.file.filename}`;
  db.run(`UPDATE users SET coverImage = ? WHERE username = ?`, [imagePath, username], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save cover image in database' });
    }
    res.json({ message: 'Cover image uploaded successfully', imagePath });
  });
});

// API to upload post image
app.post('/api/upload/postImage', upload.single('postImage'), (req, res) => {
  const { username } = req.body;
  const imagePath = `/uploads/postImages/${req.file.filename}`;
  // Store postImage in users table or another posts table if needed
  db.run(`UPDATE users SET postImage = ? WHERE username = ?`, [imagePath, username], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save post image in database' });
    }
    res.json({ message: 'Post image uploaded successfully', imagePath });
  });
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});



app.get('/', (req, res) => {
  res.send('Server is running!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
