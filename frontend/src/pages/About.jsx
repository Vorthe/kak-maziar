import React from 'react';

export default function About() {
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
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>About Me</h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          My journey, my passions, and what inspires me.
        </p>
      </header>

      {/* Timeline Section */}
      <section style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#111827', textAlign: 'center', marginBottom: '2rem' }}>
          My Story
        </h2>
        <div style={{ position: 'relative', padding: '0 2rem' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: '2rem',
            top: '2rem',
            bottom: '2rem',
            width: '2px',
            backgroundColor: '#e5e7eb',
          }} />
          {[
            { title: 'My Story', content: 'A brief overview of my background and journey.' },
            { title: 'Where I am from', content: 'My roots and hometown.' },
            { title: 'Why I became a teacher', content: 'The moment I decided to teach.' },
          ].map((item, index) => (
            <div
              key={item.title}
              style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '2rem',
                alignItems: 'flex-start',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '0.85rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}>
                {index + 1}
              </div>
              <div>
                <h3 style={{ color: '#111827', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#6b7280' }}>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Polaroid Photo Gallery Section */}
      <section style={{ padding: '3rem 2rem', background: '#f9fafb' }}>
        <h2 style={{ color: '#111827', textAlign: 'center', marginBottom: '2rem' }}>
          Polaroid Gallery
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { title: 'My Coffee', image: 'https://placehold.co/400x300/ecf0f1/333333?text=My+Coffee' },
            { title: 'My Books', image: 'https://placehold.co/400x300/ecf0f1/333333?text=My+Books' },
            { title: 'My City', image: 'https://placehold.co/400x300/ecf0f1/333333?text=My+City' },
          ].map((item, index) => (
            <div
              key={item.title}
              style={{
                width: '280px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                textAlign: 'center',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
              <div style={{ padding: '0.75rem' }}>
                <p style={{ color: '#111827', fontWeight: '600' }}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
