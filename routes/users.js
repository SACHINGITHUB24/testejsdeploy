const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/users/login');
};

// Registration page
router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('users/register', {
    title: 'Register',
    user: null,
    error: null
  });
});

// Registration handler
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  
  try {
    // Validation
    if (!username || !email || !password) {
      return res.render('users/register', {
        title: 'Register',
        user: null,
        error: 'All fields are required'
      });
    }
    
    if (password !== confirmPassword) {
      return res.render('users/register', {
        title: 'Register',
        user: null,
        error: 'Passwords do not match'
      });
    }
    
    if (password.length < 6) {
      return res.render('users/register', {
        title: 'Register',
        user: null,
        error: 'Password must be at least 6 characters long'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.render('users/register', {
        title: 'Register',
        user: null,
        error: 'User already exists with this email or username'
      });
    }
    
    // Create new user
    const user = new User({ username, email, password });
    await user.save();
    
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    
    res.redirect('/');
  } catch (error) {
    console.error('Registration error:', error);
    res.render('users/register', {
      title: 'Register',
      user: null,
      error: 'Registration failed. Please try again.'
    });
  }
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('users/login', {
    title: 'Login',
    user: null,
    error: null
  });
});

// Login handler
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    if (!username || !password) {
      return res.render('users/login', {
        title: 'Login',
        user: null,
        error: 'Username and password are required'
      });
    }
    
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });
    
    if (!user) {
      return res.render('users/login', {
        title: 'Login',
        user: null,
        error: 'Invalid credentials'
      });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('users/login', {
        title: 'Login',
        user: null,
        error: 'Invalid credentials'
      });
    }
    
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    
    res.redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    res.render('users/login', {
      title: 'Login',
      user: null,
      error: 'Login failed. Please try again.'
    });
  }
});

// Profile page
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    res.render('users/profile', {
      title: 'Profile',
      user: req.session.user,
      profile: user
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.redirect('/');
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

module.exports = router;
