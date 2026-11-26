import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load products.'))
      .finally(() => setLoading(false));
  }, []);

  const handleBuyNow = async (product) => {
    try {
      await api.post('/api/orders', {
        items: [
          {
            product_id: product.id,
            quantity: 1,
          },
        ],
      });
      navigate('/my-orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order.');
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '50px 20px',
          color: '#6b7280',
        }}
      >
        Loading products...
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
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Digital Shop</h1>
        <p style={{ color: '#9ca3af', margin: '0.5rem 0 0' }}>
          Buy ebooks, worksheets, and slides. Manual payment only.
        </p>
      </header>

      <main style={{ padding: '0 2rem 2rem' }}>
        {products.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <p style={{ color: '#6b7280' }}>No products available yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.15s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {product.cover_image ? (
                  <img
                    src={`http://localhost:8000/product-image/${product.id}`}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '0.85rem',
                    }}
                  >
                    No cover image
                  </div>
                )}
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{product.name}</h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem', flex: 1 }}>
                  {product.description || 'No description available.'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#111827',
                    }}
                  >
                    {product.price.toLocaleString()} ْ
                  </span>
                  <button
                    onClick={() => handleBuyNow(product)}
                    style={{
                      padding: '0.6rem 1.2rem',
                      backgroundColor: '#111827',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      marginLeft: 'auto',
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
