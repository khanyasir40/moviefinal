const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  poster_path: {
    type: String
  },
  backdrop_path: {
    type: String
  },
  release_date: {
    type: Date
  },
  genres: [{
    type: String
  }],
  runtime: {
    type: Number
  },
  vote_average: {
    type: Number
  },
  vote_count: {
    type: Number
  },
  popularity: {
    type: Number
  },
  director: {
    type: String
  },
  cast: [{
    id: Number,
    name: String,
    character: String,
    profile_path: String
  }],
  date_added: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster searching
MovieSchema.index({ title: 'text', overview: 'text' });

module.exports = mongoose.model('Movie', MovieSchema);