import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import api, { ensureCsrf } from './api';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import PlacementTest from './pages/PlacementTest';
import TestResult from './pages/TestResult';
import StudentDashboard from './pages/StudentDashboard';
import Shop from './pages/Shop';
import MyOrders from './pages/MyOrders';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    api
      .get('/api/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    try {
      await ensureCsrf();
      await api.post('/api/logout');
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavigate = (path) => {
    // Simple navigation helper
    window.location.href = path;
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.2rem',
          color: '#6b7280',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} onNavigate={handleNavigate} />

      <Routes>
        <Route
          path="/"
          element={
            <Home user={user} onLogin={handleLogin} onNavigate={handleNavigate} />
          }
        />
        <Route
          path="/articles"
          element={
            <Articles user={user} />
          }
        />
        <Route
          path="/articles/:slug"
          element={
            <ArticleDetail user={user} />
          }
        />
        <Route
          path="/placement-test"
          element={
            <PlacementTest />
          }
        />
        <Route
          path="/test-result"
          element={
            <TestResult user={user} />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop />
          }
        />
        <Route
          path="/my-orders"
          element={
            <MyOrders />
          }
        />
        <Route
          path="/dashboard"
          element={
            <StudentDashboard user={user} />
          }
        />
        <Route
          path="/login"
          element={
            <Login user={user} onLogin={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={
            <Register user={user} onLogin={handleLogin} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
