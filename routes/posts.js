const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/users/login');
};

// All posts page
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;
  
  try {
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Post.countDocuments({ status: 'published' });
    const totalPages = Math.ceil(total / limit);
    
    res.render('posts/index', {
      title: 'All Posts',
      posts,
      user: req.session.user,
      pagination: {
        currentPage: page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Posts index error:', error);
    res.render('posts/index', {
      title: 'All Posts',
      posts: [],
      user: req.session.user,
      pagination: { currentPage: 1, totalPages: 0, hasNext: false, hasPrev: false },
      error: 'Unable to load posts'
    });
  }
});

// Create post page
router.get('/create', requireAuth, (req, res) => {
  res.render('posts/create', {
    title: 'Create Post',
    user: req.session.user,
    error: null
  });
});

// Create post handler
router.post('/create', requireAuth, async (req, res) => {
  const { title, content, tags } = req.body;
  
  try {
    if (!title || !content) {
      return res.render('posts/create', {
        title: 'Create Post',
        user: req.session.user,
        error: 'Title and content are required'
      });
    }
    
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    const post = new Post({
      title,
      content,
      author: req.session.user.id,
      tags: tagsArray
    });
    
    await post.save();
    res.redirect(`/posts/${post._id}`);
  } catch (error) {
    console.error('Create post error:', error);
    res.render('posts/create', {
      title: 'Create Post',
      user: req.session.user,
      error: 'Failed to create post. Please try again.'
    });
  }
});

// View single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar bio')
      .populate('likes', 'username');
    
    if (!post || post.status !== 'published') {
      return res.status(404).render('404', {
        title: 'Post Not Found',
        user: req.session.user
      });
    }
    
    // Increment views
    await post.incrementViews();
    
    res.render('posts/show', {
      title: post.title,
      post,
      user: req.session.user
    });
  } catch (error) {
    console.error('Show post error:', error);
    res.status(404).render('404', {
      title: 'Post Not Found',
      user: req.session.user
    });
  }
});

// Like/unlike post
router.post('/:id/like', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const userId = req.session.user.id;
    const likeIndex = post.likes.indexOf(userId);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(userId);
    }
    
    await post.save();
    res.json({ likes: post.likes.length, liked: likeIndex === -1 });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Edit post page
router.get('/:id/edit', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post || post.author.toString() !== req.session.user.id) {
      return res.status(403).render('403', {
        title: 'Access Denied',
        user: req.session.user
      });
    }
    
    res.render('posts/edit', {
      title: 'Edit Post',
      post,
      user: req.session.user,
      error: null
    });
  } catch (error) {
    console.error('Edit post page error:', error);
    res.redirect('/posts');
  }
});

// Update post
router.put('/:id', requireAuth, async (req, res) => {
  const { title, content, tags } = req.body;
  
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post || post.author.toString() !== req.session.user.id) {
      return res.status(403).render('403', {
        title: 'Access Denied',
        user: req.session.user
      });
    }
    
    if (!title || !content) {
      return res.render('posts/edit', {
        title: 'Edit Post',
        post,
        user: req.session.user,
        error: 'Title and content are required'
      });
    }
    
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    post.title = title;
    post.content = content;
    post.tags = tagsArray;
    
    await post.save();
    res.redirect(`/posts/${post._id}`);
  } catch (error) {
    console.error('Update post error:', error);
    res.redirect('/posts');
  }
});

// Delete post
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post || post.author.toString() !== req.session.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
