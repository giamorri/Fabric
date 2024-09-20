const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // To allow requests from React frontend
const app = express();
const port = 5000;
const multer = require('multer');
const path = require('path');
console.log(req.file); // Log the file details
console.log(req.body); // Log the body (especially the username)
console.log(localStorage.getItem('username')); // Ensure this prints a valid username
const profileImage = req.file ? req.file.path : null;
console.log('File upload request:', req.file);
console.log('Request body:', req.body);
console.log([...formData.entries()]); // Log the formData entries

const formData = new FormData();
formData.append('profileImage', event.target.files[0]); // File from input
formData.append('username', localStorage.getItem('username')); // Username from local storage

console.log([...formData.entries()]); // Log the FormData before sending

fetch('http://localhost:5000/api/upload-profile-image', {
  method: 'POST',
  body: formData, // FormData should be sent directly
})
.then((response) => response.json())
.then((data) => {
  console.log('Image uploaded:', data);
  setProfileImageUrl(`http://localhost:5000/${data.profileImageUrl}`); // Update profile image
})
.catch((error) => {
  console.error('Error uploading image:', error);
});


// Allow cross-origin requests (CORS)
app.use(cors({
  origin: '*',
  credentials: true,
}));


// Set up Multer to store files in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add a timestamp to avoid overwriting files
  }
});

const upload = multer({ storage });




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
      profileImage TEXT
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
// API endpoint to get user details by username
app.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (row) {
      res.json({ user: row });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});


// API endpoint to add a new user (sign up)
app.post('/api/signin', (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const query = `SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?`;

  db.get(query, [usernameOrEmail, usernameOrEmail, password], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (row) {
      // Include the profileImage in the response
      res.json({ message: 'Sign in successful', user: row });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
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
      res.json({ message: 'Sign in successful', user: row });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  });
});



app.post('/api/upload-profile-image', upload.single('profileImage'), (req, res) => {
  const { username } = req.body;
  const profileImage = req.file ? req.file.path : null;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  db.run(`UPDATE users SET profileImage = ? WHERE username = ?`, [profileImage, username], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.json({ message: 'Profile image updated successfully', profileImageUrl: profileImage });
  });
});








// Serve static files from the 'uploads' folder

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (row) {
      // If there's a profile image, convert it into a URL that the frontend can access
      if (row.profileImage) {
        row.profileImage = `http://localhost:5000/${row.profileImage}`;
      }
      res.json({ user: row });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
