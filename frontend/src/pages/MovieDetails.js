// src/pages/MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../styles/MovieDetails.css';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Pega o token pra saber se está logado
  const token = localStorage.getItem('token');

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE}/api/movies/${id}`, { headers });
        if (res.status === 401) {
          // não autorizado → redireciona ao login
          navigate('/login');
          return;
        }
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id, navigate, token]);

  if (loading) return <p className="center-text">Loading...</p>;
  if (error)   return <p className="center-text error-text">Error: {error}</p>;
  if (!movie)  return <p className="center-text">Movie not found.</p>;

  // Extrai ano apenas se válido
  const releaseYear = movie.released
    ? (() => {
        const y = new Date(movie.released).getFullYear();
        return Number.isFinite(y) ? y : null;
      })()
    : null;

  const fmtDate = d => {
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo">MLFLIX</Link>
        {token
          ? <button className="header__login-btn" onClick={handleLogout}>
              Logout
            </button>
          : <Link to="/login" className="header__login-btn">
              Login
            </Link>
        }
      </header>

      <div className="details-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="details-content">
          <div className="details-poster-wrapper">
            <img
              src={movie.poster || 'https://placehold.co/300x450?text=No+Image'}
              alt={movie.title}
              className="details-poster"
              onError={e => e.target.src = 'https://placehold.co/300x450?text=No+Image'}
            />
          </div>

          <div className="details-info">
            <h2>
              {movie.title}
              {releaseYear && ` (${releaseYear})`}
            </h2>

            <ul className="meta-list">
              {movie.rated     && <li><strong>Rated:</strong> {movie.rated}</li>}
              {movie.runtime   != null && <li><strong>Runtime:</strong> {movie.runtime} min</li>}
              {movie.released  && <li><strong>Released:</strong> {fmtDate(movie.released)}</li>}
              {movie.genres?.length    > 0 && <li><strong>Genres:</strong> {movie.genres.join(', ')}</li>}
              {movie.directors?.length > 0 && <li><strong>Directors:</strong> {movie.directors.join(', ')}</li>}
              {movie.writers?.length   > 0 && <li><strong>Writers:</strong> {movie.writers.join(', ')}</li>}
              {movie.cast?.length      > 0 && <li><strong>Cast:</strong> {movie.cast.join(', ')}</li>}
              {movie.languages?.length > 0 && <li><strong>Languages:</strong> {movie.languages.join(', ')}</li>}
              {movie.countries?.length > 0 && <li><strong>Countries:</strong> {movie.countries.join(', ')}</li>}
              {movie.awards?.text      && <li><strong>Awards:</strong> {movie.awards.text}</li>}
              {movie.imdb?.rating      != null && (
                <li>
                  <strong>IMDB:</strong> {movie.imdb.rating} / 10 ({movie.imdb.votes} votes)
                </li>
              )}
              {movie.tomatoes?.viewer?.rating != null && (
                <li>
                  <strong>Tomatoes:</strong> {movie.tomatoes.viewer.rating} / 5 ({movie.tomatoes.viewer.numReviews} reviews)
                </li>
              )}
            </ul>

            {(movie.fullplot || movie.plot) && (
              <div className="plot">
                <h3>Plot</h3>
                <p>{movie.fullplot || movie.plot}</p>
              </div>
            )}

            <div className="comments-section">
              <h3>Comments ({movie.comments?.length || 0})</h3>
              {(!movie.comments || movie.comments.length === 0)
                ? <p>No comments yet.</p>
                : movie.comments.map(c => (
                    <div key={c._id} className="comment">
                      <p>
                        <strong>{c.name}</strong>{' '}
                        <em>on {fmtDate(c.date)}</em>
                      </p>
                      <p>{c.text}</p>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>

        <footer className="footer">
          © 2025 MLFLIX. Todos os direitos reservados.
        </footer>
      </div>
    </>
  );
}
