// backend/src/models/Movie.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  fullplot:    { type: String },
  genres:      [{ type: String }],
  runtime:     { type: Number },
  rated:       { type: String },
  cast:        [{ type: String }],
  languages:   [{ type: String }],
  released:    { type: Date },
  directors:   [{ type: String }],
  writers:     [{ type: String }],
  awards:      { type: mongoose.Mixed },
  lastupdated: { type: String },
  year:        { type: Number },
  imdb:        { type: mongoose.Mixed },
  countries:   [{ type: String }],
  type:        { type: String },
  tomatoes:    { type: mongoose.Mixed },
  num_mflix_comments: { type: Number },
  poster:      { type: String },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

export default mongoose.model('Movie', movieSchema);
