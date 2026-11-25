import React from 'react';

const LEVEL_DATA = {
  A1: { label: 'A1', color: '#3b82f6', emoji: '👶' },
  A2: { label: 'A2', color: '#60a5fa', emoji: '🧒' },
  B1: { label: 'B1', color: '#3b82f6', emoji: '🧑‍🎓' },
  B2: { label: 'B2', color: '#60a5fa', emoji: '🧑‍🏫' },
  C1: { label: 'C1', color: '#22c55e', emoji: '🎓' },
  C2: { label: 'C2', color: '#16a34a', emoji: '🏆' },
};

export default function TestResult({ result, onRestart }) {
  const levelData = LEVEL_DATA[result.level] || LEVEL_DATA.A1;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', margin: 0, color: '#111827' }}>
            🎉 Test Complete!
          </h1>
        </div>

        {/* Passport Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '2.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            border: '4px solid #ffffff',
            textAlign: 'center',
          }}
        >
          {/* Level Badge */}
          <div
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              backgroundColor: levelData.color,
              color: 'white',
              fontWeight: 700,
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            {levelData.emoji} {result.level} {levelData.emoji}
          </div>

          {/* Name */}
          <h2 style={{ margin: 0, color: '#111827', fontSize: '1.3rem' }}>
            {result.user?.name || 'Your Name'}
          </h2>

          {/* Score */}
          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
            <span style={{ fontWeight: 600, color: '#374151' }}>Score:</span> {result.score} / {result.total}
          </div>
          <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: '#6b7280' }}>
            ({result.percentage}% accuracy)
          </div>

          {/* Level Description */}
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '0.9rem', color: '#374151' }}>
            <strong style={{ color: '#111827' }}>{result.level}:</strong> {getLevelDescription(result.level)}
          </div>

          {/* Book Your Class Button */}
          <button
            onClick={onRestart}
            style={{
              marginTop: '2rem',
              padding: '1rem 2rem',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 700,
              boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 8px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(34, 197, 94, 0.3)';
            }}
          >
            📅 Book Your Class
          </button>
        </div>

        <p style={{ marginTop: '1.5rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Your English Passport level determines the classes available for booking.
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          h1 { font-size: 1.4rem; }
          .passport-card { padding: 1.5rem; }
          .level-badge { font-size: 1.2rem; padding: 0.4rem 1rem; }
        }
      `}</style>
    </div>
  );
}

function getLevelDescription(level) {
  const descriptions = {
    A1: 'Beginner. You can understand and use familiar everyday expressions.',
    A2: 'Elementary. You can communicate in simple and routine tasks.',
    B1: 'Intermediate. You can deal with most situations while traveling.',
    B2: 'Upper Intermediate. You can interact with native speakers fairly fluently.',
    C1: 'Advanced. You can express ideas clearly and spontaneously.',
    C2: 'Proficiency. You have complete command of the language.',
  };
  return descriptions[level] || '';
}
