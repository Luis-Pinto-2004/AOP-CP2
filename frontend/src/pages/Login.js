import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, password }),
      });

      // Lê o corpo UMA ÚNICA VEZ
      const data = await res.json();

      if (!res.ok) {
        // Se a API retornar { message: "..." }, usamos ela; senão, fallback pro status
        throw new Error(data.message || `Login failed (${res.status})`);
      }

      // Se chegou aqui, login foi OK e data.token existe
      const { token } = data;
      localStorage.setItem('token', token);
      navigate('/');
      
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">Login</button>
      </form>

      <Link to="/signup" className="auth-btn auth-btn--secondary">
        Signup
      </Link>
    </div>
  );
}
