import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
})

api.interceptors.request.use((config) => {
  const token = document.cookie.split('; ').find((row) => row.startsWith('XSRF-TOKEN='))
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1])
  }
  return config
})

export const ensureCsrf = () => api.get('/sanctum/csrf-cookie')

export default api
