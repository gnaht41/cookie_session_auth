const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'User registration failed', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    // Set user ID in session
    // Express-session will handle setting the cookie
    // Express automatically sets the cookie named 'connect.sid' by default
    req.session.userId = user._id;

    res.json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });

    // Clear cookies
    res.clearCookie("connect.sid");
    res.json({ message: 'Logout successful!' });
    
  });
});

// Protected route
router.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = await User.findById(req.session.userId).select('-password');
  res.json(user);
});

module.exports = router;
