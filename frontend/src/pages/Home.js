// src/pages/Home.js
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.css'

const API_BASE    = process.env.REACT_APP_API_BASE
const PLACEHOLDER = 'https://placehold.co/300x450?text=No+Image'

export default function Home() {
  const navigate = useNavigate()
  const [movies, setMovies]         = useState([])
  const [genres, setGenres]         = useState([])
  const [titleFilter, setTitle]     = useState('')
  const [genreFilter, setGenre]     = useState('All')
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  // Pega token pra saber se está logado
  const token = localStorage.getItem('token')

  // Handler de logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    // redireciona pro login
    navigate('/login')
  }

  // carrega gêneros
  useEffect(() => {
    fetch(`${API_BASE}/api/movies/genres`)
      .then(r => r.json())
      .then(list => setGenres(['All', ...list]))
      .catch(console.error)
  }, [])

  // carrega filmes sempre que muda filtro ou página
  useEffect(() => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams({
      title: titleFilter,
      genre: genreFilter,
      page,
      limit: 50,
    })
    fetch(`${API_BASE}/api/movies?${params}`)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText)
        return r.json()
      })
      .then(({ movies: mv = [], totalPages: tp = 1 }) => {
        setMovies(mv)
        setTotalPages(tp)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [titleFilter, genreFilter, page])

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header__logo">MLFLIX</Link>
        {token
          ? <button
              className="header__login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          : <Link to="/login" className="header__login-btn">
              Login
            </Link>
        }
      </header>

      <div className="page-title">
        <h1>Movie Listings</h1>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={titleFilter}
          onChange={e => { setTitle(e.target.value); setPage(1) }}
        />
        <select
          value={genreFilter}
          onChange={e => { setGenre(e.target.value); setPage(1) }}
        >
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {loading && <p className="center-text">Loading...</p>}
      {error   && <p className="center-text error-text">Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="movie-grid">
            {movies
              // só quem tem poster definido
              .filter(m => m.poster)
              .map(m => {
                const realUrl = m.poster.startsWith('http')
                  ? m.poster
                  : `https://${m.poster}`

                return (
                  <Link
                    key={m._id}
                    to={`/movies/${m._id}`}
                    className="movie-card"
                  >
                    <div className="poster-wrapper">
                      <img
                        loading="lazy"
                        src={PLACEHOLDER}
                        data-src={realUrl}
                        alt={m.title}
                        className="poster"
                        onLoad={e => {
                          const url = e.target.getAttribute('data-src')
                          if (url) {
                            const img = new Image()
                            img.src = url
                            img.onload = () => { e.target.src = url }
                          }
                        }}
                      />
                    </div>
                    <div className="info">
                      <h2 className="title">{m.title}</h2>
                      <div className="genres">
                        {(m.genres || []).map((g,i) => (
                          <span key={i} className="genre">{g}</span>
                        ))}
                      </div>
                      <Link to={`/movies/${m._id}`} className="btn">
                        View Details
                      </Link>
                    </div>
                  </Link>
                )
              })
            }
          </div>

          <div className="pagination">
            <button
              className="page-btn"
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
            >
              Prev
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="page-btn"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      <footer className="footer">
        © 2025 MLFLIX. Todos os direitos reservados.
      </footer>
    </div>
  )
}
