import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Home({ user, onLogin }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/api/articles')
      .then((res) => setArticles(res.data.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load articles.'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');
      onLogin(null);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <header
        style={{
          backgroundColor: '#111827',
          color: 'white',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>Welcome to kak-maziar</h1>
        <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>
          {user ? `Hello, ${user.name}! Explore our articles.` : 'Please login or register to get started.'}
        </p>
      </header>

      <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        {error && <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>}

        {user ? (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Management</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => navigate('/articles')}
                style={buttonStyle}
              >
                Browse Articles
              </button>
              <button
                onClick={handleLogout}
                style={{ ...buttonStyle, backgroundColor: '#dc2626' }}
              >
                Logout
              </button>
            </div>
          </section>
        ) : (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Login or Register</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => navigate('/login')}
                style={buttonStyle}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{ ...buttonStyle, backgroundColor: '#3b82f6' }}
              >
                Register
              </button>
            </div>
          </section>
        )}

        <section>
          <h2 style={{ marginBottom: '1rem' }}>Latest Articles</h2>
          {loading ? (
            <p style={{ color: '#6b7280' }}>Loading articles...</p>
          ) : articles.length === 0 ? (
            <p style={{ color: '#6b7280' }}>No articles available yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {articles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => navigate(`/articles/${article.slug}`)}
                  style={articleCardStyle}
                >
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{article.title}</h3>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    {article.category?.name || 'No category'}
                  </p>
                  <span
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.2rem 0.6rem',
                      backgroundColor: '#e0e7ff',
                      color: '#3730a3',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                    }}
                  >
                    {article.level || '-'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const buttonStyle = {
  padding: '0.9rem 1.5rem',
  backgroundColor: '#111827',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600,
};

const articleCardStyle = {
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  cursor: 'pointer',
  textAlign: 'left',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  transition: 'box-shadow 0.15s',
};

articleCardStyle.onMouseEnter = {
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};
