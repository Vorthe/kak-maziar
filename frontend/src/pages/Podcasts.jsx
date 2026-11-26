import React from 'react';

const podcastLinks = [
  {
    name: 'Coffee Break English',
    url: 'https://example.com/podcast/coffee-break-english',
    description: 'Learn English with daily coffee break lessons.',
  },
  {
    name: 'English with Friends',
    url: 'https://example.com/podcast/english-with-friends',
    description: 'Join our friendly community for English practice.',
  },
];

export default function Podcasts() {
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
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Podcasts</h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          Listen to our latest episodes and join the conversation.
        </p>
      </header>

      {/* Podcast Links Section */}
      <main style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#111827', textAlign: 'center', marginBottom: '2rem' }}>
          Podcast Links
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {podcastLinks.map((podcast) => (
            <a
              key={podcast.name}
              href={podcast.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#333',
                gap: '0.5rem',
              }}
            >
              <h3 style={{ color: '#111827', margin: 0 }}>{podcast.name}</h3>
              <p style={{ color: '#6b7280', margin: 0 }}>{podcast.description}</p>
            </a>
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
