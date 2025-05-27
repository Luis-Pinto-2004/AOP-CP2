import Movie from '../models/Movie.js';

/**
 * GET /api/movies
 */
export async function getAllMovies(req, res) {
  const { title = '', genre = 'All' } = req.query;
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 50);
  const page  = Math.max(1, parseInt(req.query.page,  10) || 1);
  const skip  = (page - 1) * limit;

  const filter = {};
  if (title)  filter.title = { $regex: title, $options: 'i' };
  if (genre && genre !== 'All') filter.genres = genre;

  try {
    const [movies, total] = await Promise.all([
      Movie.find(filter)
        .skip(skip)
        .limit(limit)
        .select('title poster genres releaseDate')
        .lean(),
      Movie.countDocuments(filter)
    ]);
    const totalPages = Math.ceil(total / limit);
    res.json({ movies, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar filmes.' });
  }
}

/**
 * GET /api/movies/genres
 * retorna lista única de gêneros para dropdown
 */
export async function getAllGenres(req, res) {
  try {
    const genres = await Movie.distinct('genres');
    res.json(genres.sort());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar gêneros.' });
  }
}

/**
 * GET /api/movies/:id
 */
export async function getMovieById(req, res) {
  try {
    const movie = await Movie.findById(req.params.id).lean();
    if (!movie) return res.status(404).json({ message: 'Filme não encontrado.' });
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar detalhes do filme.' });
  }
}
