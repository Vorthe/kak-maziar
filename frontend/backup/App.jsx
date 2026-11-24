import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import api, { ensureCsrf } from './api'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await ensureCsrf()
      const { data } = await api.post('/api/login', { email, password })
      setUser(data)
      nav('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <form
      onSubmit={submit}
      style={{ maxWidth: 320, margin: '4rem auto', fontFamily: 'sans-serif' }}
    >
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Login
      </button>
      <p>
        <Link to="/register">No account? Register</Link>
      </p>
    </form>
  )
}

function Register({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [error, setError] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await ensureCsrf()
      const { data } = await api.post('/api/register', form)
      setUser(data)
      nav('/')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          JSON.stringify(err.response?.data?.errors || 'Register failed')
      )
    }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <form
      onSubmit={submit}
      style={{ maxWidth: 320, margin: '4rem auto', fontFamily: 'sans-serif' }}
    >
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={form.name}
        onChange={set('name')}
        placeholder="Name"
        style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
      />
      <input
        value={form.email}
        onChange={set('email')}
        placeholder="Email"
        style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
      />
      <input
        type="password"
        value={form.password}
        onChange={set('password')}
        placeholder="Password"
        style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
      />
      <input
        type="password"
        value={form.password_confirmation}
        onChange={set('password_confirmation')}
        placeholder="Confirm password"
        style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Register
      </button>
      <p>
        <Link to="/login">Have account? Login</Link>
      </p>
    </form>
  )
}

function Home({ user, setUser }) {
  const nav = useNavigate()
  const logout = async () => {
    await ensureCsrf()
    await api.post('/api/logout')
    setUser(null)
    nav('/login')
  }
  if (!user) return <Navigate to="/login" replace />
  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>
      <button onClick={logout} style={{ padding: '8px 16px' }}>
        Logout
      </button>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/api/me')
      .then((r) => setUser(r.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading...</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  )
}
