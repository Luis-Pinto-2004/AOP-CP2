import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(compression());

// Middleware
app.use(cors()); // Allow CORS for frontend on port 3801
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});