const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create new user
      user = new User({
        name,
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to database
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Registration error:', err.message);
      res.status(500).json({ msg: 'Database connection error. Please check your MongoDB setup.' });
    }
  }
);

// @route   PUT api/users/favorites/:id
// @desc    Add movie to favorites
// @access  Private
router.put('/favorites/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Check if movie is already in favorites
    if (user.favorites.includes(req.params.id)) {
      return res.status(400).json({ msg: 'Movie already in favorites' });
    }
    
    user.favorites.push(req.params.id);
    await user.save();
    
    res.json(user.favorites);
  } catch (err) {
    console.error('Add to favorites error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   DELETE api/users/favorites/:id
// @desc    Remove movie from favorites
// @access  Private
router.delete('/favorites/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Remove movie from favorites
    user.favorites = user.favorites.filter(
      (movieId) => movieId !== req.params.id
    );
    
    await user.save();
    
    res.json(user.favorites);
  } catch (err) {
    console.error('Remove from favorites error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   PUT api/users/watchlist/:id
// @desc    Add movie to watchlist
// @access  Private
router.put('/watchlist/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Check if movie is already in watchlist
    if (user.watchlist.includes(req.params.id)) {
      return res.status(400).json({ msg: 'Movie already in watchlist' });
    }
    
    user.watchlist.push(req.params.id);
    await user.save();
    
    res.json(user.watchlist);
  } catch (err) {
    console.error('Add to watchlist error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   DELETE api/users/watchlist/:id
// @desc    Remove movie from watchlist
// @access  Private
router.delete('/watchlist/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Remove movie from watchlist
    user.watchlist = user.watchlist.filter(
      (movieId) => movieId !== req.params.id
    );
    
    await user.save();
    
    res.json(user.watchlist);
  } catch (err) {
    console.error('Remove from watchlist error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/users/ratings/:id
// @desc    Rate a movie
// @access  Private
router.post(
  '/ratings/:id',
  [
    auth,
    check('rating', 'Rating must be between 1 and 10').isInt({ min: 1, max: 10 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      
      // Check if user has already rated this movie
      const ratingIndex = user.ratings.findIndex(
        (item) => item.movie === req.params.id
      );
      
      if (ratingIndex > -1) {
        // Update existing rating
        user.ratings[ratingIndex].rating = req.body.rating;
        user.ratings[ratingIndex].date = Date.now();
      } else {
        // Add new rating
        user.ratings.push({
          movie: req.params.id,
          rating: req.body.rating
        });
      }
      
      await user.save();
      
      res.json(user.ratings);
    } catch (err) {
      console.error('Rate movie error:', err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;