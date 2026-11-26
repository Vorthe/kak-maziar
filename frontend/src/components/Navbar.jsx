import React from 'react';

export default function Navbar({ user, onLogout, onNavigate }) {
  return (
    <nav className="bg-[#3E2723] text-[#F4EBD9] px-6 py-4 font-['Cinzel','Georgia',serif] border-b border-[#D4AF37]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-2xl font-bold tracking-wide">kak-maziar</span>

        <div className="flex items-center gap-2">
          <NavLink label="Home" to="/" currentPath="/" onNavigate={onNavigate} />
          <NavLink label="Articles" to="/articles" currentPath="/articles" onNavigate={onNavigate} />
          <NavLink label="About" to="/about" currentPath="/about" onNavigate={onNavigate} />
          <NavLink label="Podcasts" to="/podcasts" currentPath="/podcasts" onNavigate={onNavigate} />
          <NavLink label="Favorites" to="/favorites" currentPath="/favorites" onNavigate={onNavigate} />
          <NavLink label="Shop" to="/shop" currentPath="/shop" onNavigate={onNavigate} />
          <NavLink label="Placement Test" to="/placement-test" currentPath="/placement-test" onNavigate={onNavigate} />
          <NavLink label="Dashboard" to="/dashboard" currentPath="/dashboard" onNavigate={onNavigate} />

          {user ? (
            <>
              <span className="px-3 py-1.5 rounded bg-[#F4EBD9] text-[#3E2723] text-xs font-medium">
                Hello, {user.name}
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-1.5 bg-red-600 text-white rounded-md font-medium text-sm hover:bg-red-700 transition"
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
      </div>
    </nav>
  );
}

function NavLink({ label, to, currentPath, onNavigate }) {
  const isActive = currentPath === to;
  return (
    <button
      onClick={() => onNavigate(to)}
      className={`px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-150 ${
        isActive
          ? 'bg-[#3E2723] text-[#F4EBD9]'
          : 'bg-[#F4EBD9] text-[#3E2723] hover:bg-[#D4AF37]'
      }`}
    >
      {label}
    </button>
  );
}
