import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { ensureCsrf } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await ensureCsrf();
      const res = await api.post('/api/login', { email, password });
      onLogin(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '340px',
        margin: '40px auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111827' }}>Login</h2>

      {error && (
        <p style={{ color: '#dc2626', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            padding: '0.8rem',
            backgroundColor: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '0.8rem',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '1rem',
  outline: 'none',
  fontFamily: 'inherit',
};
