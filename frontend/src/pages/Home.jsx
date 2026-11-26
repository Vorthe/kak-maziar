import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Home({ user, onLogin }) {
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

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');
      onLogin(null);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Hero Section - Model B */}
      <header className="bg-[#F4EBD9] py-12 px-4 sm:py-16 sm:px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Cinzel] text-[#3E2723] leading-tight">
            Welcome to kak-maziar
          </h1>
          <p className="mt-3 text-[#6B5A4A] text-lg max-w-xl">
            {user
              ? `Hello, ${user.name}! Explore our articles and say hi.`
              : 'Please login or register to get started.'}
          </p>
          <button
            onClick={() => navigate('/placement-test')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7B241C] text-[#F4EBD9] font-[Cinzel] rounded-md font-semibold transition hover:bg-[#D4AF37] hover:text-[#3E2723] active:transform-active-transform"
          >
            Take the placement test
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12 sm:px-8">
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {user ? (
          <section className="mb-6">
            <h2 className="text-2xl font-[Cinzel] text-[#3E2723] mb-3">Management</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/articles')}
                className="btn-primary"
              >
                Browse Articles
              </button>
              <button
                onClick={handleLogout}
                className="btn-primary bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </div>
          </section>
        ) : (
          <section className="mb-6">
            <h2 className="text-2xl font-[Cinzel] text-[#3E2723] mb-3">Login or Register</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/login')}
                className="btn-primary"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                Register
              </button>
            </div>
          </section>
        )}

        {/* Coffee Break English Section */}
        <section className="mb-10">
          <div className="bg-[#F4EBD9] rounded-xl p-8 sm:p-10">
            <h2 className="text-2xl font-[Cinzel] text-[#3E2723] text-center mb-2">
              ☕ Coffee Break English
            </h2>
            <p className="text-[#6B5A4A] text-center mb-6 max-w-2xl">
              Learn English in just a few minutes a day. Perfect for your daily coffee break.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: '15-Minute Lessons', description: 'Short, focused lessons you can finish in the time it takes to drink a coffee.' },
                { title: 'Daily Practice', description: 'Build consistency with daily listening and speaking exercises.' },
                { title: 'Real-World English', description: 'Learn practical vocabulary and idioms you can use immediately.' },
                { title: 'Audio & Video', description: 'Native speaker audio and video lessons for better listening skills.' },
              ].map((item, index) => (
                <div key={index} className="card">
                  <h3 className="text-[#3E2723] font-[Cinzel] mb-1">{item.title}</h3>
                  <p className="text-[#6B5A4A] text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-[Cinzel] text-[#3E2723] mb-4 text-center">
            Latest Articles
          </h2>
          {loading ? (
            <p className="text-[#6B5A4A]">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="text-[#6B5A4A]">No articles available yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <div key={article.id} className="card cursor-pointer">
                  <h3 className="text-[#3E2723] font-[Cinzel] mt-1">{article.title}</h3>
                  <p className="text-[#6B5A4A] text-sm mt-1">
                    {article.category?.name || 'No category'}
                  </p>
                  {article.level && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#E0E7FF] text-[#3730A3] text-xs font-medium">
                      Level: {article.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
