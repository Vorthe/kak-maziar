import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/api/orders/my')
      .then((res) => setOrders(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load orders.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (order, product) => {
    try {
      const res = await api.get(`/api/orders/${order.id}/download/${product.id}`);
      window.open(res.data.download_url, '_blank');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get download link.');
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
        Loading orders...
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
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>My Orders</h1>
        <p style={{ color: '#9ca3af', margin: '0.5rem 0 0' }}>
          Track and download your purchases
        </p>
      </header>

      <main style={{ padding: '0 2rem 2rem' }}>
        {orders.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <p style={{ color: '#6b7280' }}>No orders yet.</p>
            <button
              onClick={() => navigate('/shop')}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#111827',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 600,
              }}
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                    Order #{order.id} · {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
                  </h3>
                  <span
                    style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      backgroundColor: order.status === 'paid' ? '#16a34a' : '#f59e0b',
                    }}
                  >
                    {order.status === 'paid' ? 'Paid' : 'Awaiting Payment Confirmation'}
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ margin: '0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
                    Total: <strong>{order.total.toLocaleString()} ْ</strong>
                  </p>
                </div>

                {order.orderItems && order.orderItems.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          padding: '0.75rem',
                          backgroundColor: '#f9fafb',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{item.product?.name || 'Unknown product'}</p>
                        <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.8rem' }}>
                          {item.price.toLocaleString()} ْ
                        </p>
                        {order.status === 'paid' ? (
                          <button
                            onClick={() => handleDownload(order, item.product)}
                            style={{
                              marginTop: '0.5rem',
                              padding: '0.5rem 1rem',
                              backgroundColor: '#16a34a',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                            }}
                          >
                            Download File
                          </button>
                        ) : (
                          <span
                            style={{
                              marginTop: '0.5rem',
                              padding: '0.4rem 0.8rem',
                              backgroundColor: '#f3f4f6',
                              borderRadius: '6px',
                              color: '#6b7280',
                              fontSize: '0.8rem',
                            }}
                          >
                            Awaiting Payment Confirmation
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>No items in this order.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
