import { Router } from 'express';
import {
  getAllMovies,
  getAllGenres,
  getMovieById
} from '../controllers/movieController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/movies
 *  - ?title=...   (string, regex)
 *  - ?genre=...   (string, must match one of genres or 'All')
 *  - ?page=1      (default 1)
 *  - ?limit=50    (default 50)
 */
router.get('/', getAllMovies);

// rota para popular dropdown de gêneros
router.get('/genres', getAllGenres);

// detalhes de um único filme (protected)
router.get('/:id', protect, getMovieById);

export default router;
