// backend/src/models/Comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  text:     { type: String, required: true },
  date:     { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
