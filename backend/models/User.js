const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  favorites: [{
    type: String // Store TMDB movie IDs as strings
  }],
  watchlist: [{
    type: String // Store TMDB movie IDs as strings
  }],
  ratings: [
    {
      movie: {
        type: String // Store TMDB movie IDs as strings
      },
      rating: {
        type: Number,
        min: 1,
        max: 10
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);