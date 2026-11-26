import React from 'react';

const favorites = [
  { type: 'Song', title: 'Wonderwall', artist: 'Oasis', link: 'https://example.com/song/1' },
  { type: 'Song', title: 'Here Comes the Sun', artist: 'The Beatles', link: 'https://example.com/song/2' },
  { type: 'Book', title: 'The Alchemist', author: 'Paulo Coelho', link: 'https://example.com/book/1' },
  { type: 'Book', title: 'To Kill a Mockingbird', author: 'Harper Lee', link: 'https://example.com/book/2' },
  { type: 'Quote', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { type: 'Quote', text: 'Believe you can and you are halfway there.', author: 'Theodore Roosevelt' },
];

export default function Favorites() {
  return (
    <div>
      {/* Hero Section */}
      <header
        style={{
          background: 'linear-gradient(135deg, #fdfbf7 0%, #f5f0e6 100%)',
          padding: '4rem 2rem',
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Favorites</h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          A collection of songs, books, and quotes that inspire me.
        </p>
      </header>

      {/* Favorites Section */}
      <main style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#111827', textAlign: 'center', marginBottom: '2rem' }}>
          Songs, Books &amp; Quotes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {favorites.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.25rem',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <span style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                color: '#6b7280',
                letterSpacing: '0.05em',
              }}>
                {item.type}
              </span>
              <p style={{ color: '#111827', margin: '0.5rem 0 0' }}>{item.title || item.text}</p>
              {item.artist || item.author ? (
                <p style={{ color: '#6b7280', margin: '0.25rem 0 0' }}>
                  {item.artist || item.author}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </main>

      {/* Telegram Link Section */}
      <div
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          background: '#f9fafb',
        }}
      >
        <h2 style={{ color: '#111827', marginBottom: '1rem' }}>Connect with Us</h2>
        <a
          href="https://t.me/kakmaziar"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2ca0f0',
            color: 'white',
            borderRadius: '6px',
            fontWeight: '600',
          }}
        >
          Join our Telegram
        </a>
      </div>
    </div>
  );
}
