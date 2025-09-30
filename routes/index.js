const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Home page - show recent posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(10);
    
    const totalPosts = await Post.countDocuments({ status: 'published' });
    const totalUsers = await User.countDocuments();
    
    res.render('index', {
      title: 'Welcome to EJS Demo',
      posts,
      stats: { totalPosts, totalUsers },
      user: req.session.user
    });
  } catch (error) {
    console.error('Home page error:', error);
    res.render('index', {
      title: 'Welcome to EJS Demo',
      posts: [],
      stats: { totalPosts: 0, totalUsers: 0 },
      user: req.session.user,
      error: 'Unable to load posts'
    });
  }
});

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    user: req.session.user
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
    user: req.session.user
  });
});

// Search functionality
router.get('/search', async (req, res) => {
  const { q } = req.query;
  
  try {
    let posts = [];
    if (q && q.trim()) {
      posts = await Post.find({
        $text: { $search: q },
        status: 'published'
      })
      .populate('author', 'username avatar')
      .sort({ score: { $meta: 'textScore' } });
    }
    
    res.render('search', {
      title: 'Search Results',
      posts,
      query: q,
      user: req.session.user
    });
  } catch (error) {
    console.error('Search error:', error);
    res.render('search', {
      title: 'Search Results',
      posts: [],
      query: q,
      user: req.session.user,
      error: 'Search temporarily unavailable'
    });
  }
});

module.exports = router;
