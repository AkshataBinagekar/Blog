
// Import necessary modules
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();
const port = 5000;

// Create a PostgreSQL Pool instance
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'world',
    password: 'akshata',
    port: 5433, // Make sure this port is correct
});

app.use(bodyParser.json());

// Middleware for enabling CORS
app.use(cors({ origin: '*' }));

// Middleware for serving static files (images)
app.use(express.static('uploads'));

// Middleware for handling file uploads
const upload = multer();

// Middleware
app.use(express.json());

// Signup endpoint
app.post('/Signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
  
      // Store the hashed password in the database
      const result = await pool.query(
        'INSERT INTO form (email, password) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
      );
      res.json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Login endpoint
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Fetch user from the database based on email
      const result = await pool.query(
        'SELECT * FROM form WHERE email = $1',
        [email]
      );
      
      if (result.rows.length === 0) {
        // User not found
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // Compare hashed password from the database with the provided password
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // Passwords don't match
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Successful login
      res.json({ message: 'Login successful' });
    } catch (error) {
      // Handle database errors or other exceptions
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
 // Endpoint to handle forgot password request
app.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    const token = uuid.v4(); // Generate unique token
  
    try {
      // Update the user's record with the reset token and token creation timestamp
      await pool.query(
        'UPDATE form SET reset_token = $1, reset_token_created_at = CURRENT_TIMESTAMP WHERE email = $2',
        [token, email]
      );
  
      // Send reset email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'akshatabinagekar.28@gmail.com',
          pass: 'mrne ebxb xhbg qyox'
        }
      });
  
      const mailOptions = {
        from: 'akshatabinagekar.28@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:3000/resetpassword?token=${token}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).send('Reset email sent successfully.');
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Error sending reset email.');
    }
  });
  
  // Endpoint to reset password
  app.post('/resetpassword', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds
  
      // Check if the token is valid and not expired
      const result = await pool.query(
        'SELECT * FROM form WHERE reset_token = $1 AND reset_token_created_at >= NOW() - INTERVAL \'24 hours\'',
        [token]
      );
  
      if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired reset token.' });
      }
  
      // Update the user's password and reset token fields
      await pool.query(
        'UPDATE form SET password = $1, reset_token = NULL, reset_token_created_at = NULL WHERE reset_token = $2',
        [hashedPassword, token]
      );
  
      res.status(200).send('Password reset successfully.');
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Error resetting password.');
    }
  });


// Route to handle image uploads and post data insertion
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const imageBinary = req.file.buffer;

        const client = await pool.connect();
        const query = 'INSERT INTO posts (title, content, image) VALUES ($1, $2, $3) RETURNING *';
        const values = [title, content, imageBinary];
        const result = await client.query(query, values);

        client.release();
        res.json({ success: true, post: result.rows[0] });
    } catch (error) {
        console.error('Error inserting post:', error);
        res.status(500).json({ success: false, error: 'An error occurred while processing your request' });
    }
});

// Route to fetch all posts
app.get('/api/posts', async (req, res) => {
  try {
      // Connect to the database
      const client = await pool.connect();

      // Query to select all posts from the 'posts' table
      const query = 'SELECT id, title, content, encode(image::bytea, \'base64\') AS image FROM posts';
      // Note: encode(image::bytea, 'base64') is used to convert the binary data to Base64

      // Execute the query
      const result = await client.query(query);

      // Release the client back to the pool
      client.release();

      // Send the posts as a JSON response
      res.json({ posts: result.rows });
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});
// Route to fetch a single post by its ID
app.get('/api/posts/:postId', async (req, res) => {
  try {
      const { postId } = req.params;

      // Connect to the database
      const client = await pool.connect();

      // Query to select the post with the specified ID
      const query = 'SELECT id, title, content, encode(image::bytea, \'base64\') AS image FROM posts WHERE id = $1';
      // Note: encode(image::bytea, 'base64') is used to convert the binary data to Base64

      // Execute the query with the postId parameter
      const result = await client.query(query, [postId]);

      // Release the client back to the pool
      client.release();

      // Check if the post with the specified ID exists
      if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Post not found' });
      }

      // Send the post as a JSON response
      res.json({ post: result.rows[0] });
  } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
