import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Articles() {
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

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '50px 20px',
          color: '#6b7280',
        }}
      >
        Loading articles...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#b91c1c',
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div>
      <header
        style={{
          backgroundColor: '#111827',
          color: 'white',
          padding: '2rem',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Articles</h1>
        <p style={{ color: '#9ca3af', margin: '0.5rem 0 0' }}>
          Latest articles from our writers
        </p>
      </header>

      <main style={{ padding: '0 2rem 2rem' }}>
        {articles.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <p style={{ color: '#6b7280' }}>No published articles yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {articles.map((article) => (
              <button
                key={article.id}
                onClick={() => navigate(`/articles/${article.slug}`)}
                style={articleCardStyle}
              >
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{article.title}</h3>
                <p style={{ margin: '0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
                  {article.category?.name || 'No category'}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    backgroundColor: '#e0e7ff',
                    color: '#3730a3',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  {article.level || '-'}
                </span>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

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
