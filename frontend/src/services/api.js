// src/services/api.js

const API_BASE = process.env.REACT_APP_API_BASE;

// helper para erros HTTP
async function handleResponse(res) {
  const text = await res.text();
  if (!res.ok) throw new Error(text || `API error ${res.status}`);
  return JSON.parse(text);
}

// filmes
export async function fetchMovies() {
  const response = await fetch(`${API_BASE}/api/movies`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
}

// filme por id
export async function fetchMovieById(id) {
  const res = await fetch(`${API_BASE}/api/movies/${id}`);
  return handleResponse(res);
}

// autenticação
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
}

export async function signupUser(data) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

