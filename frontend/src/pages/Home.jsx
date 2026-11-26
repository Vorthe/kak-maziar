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
      .then((res) => setArticles(res.data.data.slice(0, 3)))
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
      {/* Model B Hero Section */}
      <header style={{ display: 'flex', gap: '2rem', padding: '2rem 2rem', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              background: '#fdfbf7',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              minHeight: '320px',
            }}
          >
            <img
              src="https://placehold.co/600x400/ecf0f1/333333?text=Welcome+to+kak-maziar"
              alt="Welcome"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div style={{ flex: 1, padding: '2rem', backgroundColor: '#fdfbf7' }}>
          <h1 style={{ color: '#111827', marginBottom: '1rem', fontSize: '2rem' }}>
            Welcome to kak-maziar
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '500px' }}>
            {user
              ? `Hello, ${user.name}! Explore our articles and say hi.`
              : 'Please login or register to get started.'}
          </p>
          <button
            onClick={() => navigate('/placement-test')}
            style={{
              padding: '0.9rem 1.8rem',
              backgroundColor: '#111827',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.05rem',
              fontWeight: 600,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            Take the placement test
          </button>
        </div>
      </header>

      {/* Coffee Break English Section */}
      <section style={{ padding: '3rem 2rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ color: '#111827', textAlign: 'center', marginBottom: '1.5rem' }}>
            ☕ Coffee Break English
          </h2>
          <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '2rem' }}>
            Learn English in just a few minutes a day. Perfect for your daily coffee break.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: '15-Minute Lessons', description: 'Short, focused lessons you can finish in the time it takes to drink a coffee.' },
              { title: 'Daily Practice', description: 'Build consistency with daily listening and speaking exercises.' },
              { title: 'Real-World English', description: 'Learn practical vocabulary and idioms you can use immediately.' },
              { title: 'Audio & Video', description: 'Native speaker audio and video lessons for better listening skills.' },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <h3 style={{ color: '#111827', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles (3) */}
      <section style={{ padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ color: '#111827', textAlign: 'center', marginBottom: '2rem' }}>
            Latest Articles
          </h2>
          {loading ? (
            <p style={{ color: '#6b7280', textAlign: 'center' }}>Loading articles...</p>
          ) : articles.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center' }}>No articles available yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {articles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => navigate(`/articles/${article.slug}`)}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    transition: 'box-shadow 0.15s',
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{article.title}</h3>
                  <p style={{ margin: '0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
                    {article.category?.name || 'No category'}
                  </p>
                  {article.level && (
                    <span style={{
                      marginTop: '0.75rem',
                      padding: '0.2rem 0.6rem',
                      backgroundColor: '#e0e7ff',
                      color: '#3730a3',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      Level: {article.level}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Login / Register (for non-logged-in users) */}
      {!user && (
        <section style={{ padding: '3rem 2rem' }}>
          <h2 style={{ color: '#111827', textAlign: 'center', marginBottom: '1rem' }}>
            Please Login or Register
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '0.9rem 1.5rem',
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
            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '0.9rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Register
            </button>
          </div>
        </section>
      )}

      {/* Management Section (for logged-in users) */}
      {user && (
        <section style={{ padding: '3rem 2rem' }}>
          <h2 style={{ color: '#111827', textAlign: 'center', marginBottom: '1rem' }}>
            Management
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => navigate('/articles')}
              style={{
                padding: '0.9rem 1.5rem',
                backgroundColor: '#111827',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Browse Articles
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.9rem 1.5rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
