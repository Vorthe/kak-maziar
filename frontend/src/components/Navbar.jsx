import React from 'react';

export default function Navbar({ user, onLogout, onNavigate }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>
          kak-maziar
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <NavLink label="Home" to="/" currentPath="/" onNavigate={onNavigate} />
        <NavLink label="Articles" to="/articles" currentPath="/articles" onNavigate={onNavigate} />
        <NavLink label="Placement Test" to="/placement-test" currentPath="/placement-test" onNavigate={onNavigate} />

        {user ? (
          <>
            <span
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                fontSize: '0.9rem',
                color: '#374151',
              }}
            >
              Hello, {user.name}
            </span>
            <button
              onClick={onLogout}
              style={{
                padding: '0.5rem 1.2rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink label="Login" to="/login" currentPath="/login" onNavigate={onNavigate} />
            <NavLink label="Register" to="/register" currentPath="/register" onNavigate={onNavigate} />
          </>
        )}
      </div>
    </nav>
  );
}

function NavLink({ label, to, currentPath, onNavigate }) {
  const isActive = currentPath === to;
  return (
    <button
      onClick={() => onNavigate(to)}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: isActive ? '#111827' : '#f3f4f6',
        color: isActive ? '#ffffff' : '#374151',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: '0.95rem',
        transition: 'background-color 0.15s',
      }}
    >
      {label}
    </button>
  );
}
