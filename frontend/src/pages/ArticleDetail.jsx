import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/articles/${slug}`)
      .then((res) => setArticle(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Article not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '50px 20px',
          color: '#6b7280',
        }}
      >
        Loading article...
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
          textAlign: 'center',
        }}
      >
        {error}
        <button
          onClick={() => navigate('/articles')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Back to articles
        </button>
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{article.title}</h1>
          <p style={{ color: '#9ca3af', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
            {article.category?.name || 'No category'}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          {article.level && (
            <span
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.8rem',
                backgroundColor: '#e0e7ff',
                color: '#3730a3',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Level: {article.level}
            </span>
          )}
        </div>
      </header>

      <main style={{ padding: '0 2rem 2rem' }}>
        <article
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '2rem',
          }}
        >
          <div
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#111827',
            }}
          >
            {article.content || 'No content available.'}
          </div>
        </article>
      </main>
    </div>
  );
}
