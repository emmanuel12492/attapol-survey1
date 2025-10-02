import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://attapol-survey1-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout
  timeout: 5000,
  // Allow credentials (cookies, auth headers)
  withCredentials: true,
})

// Add a request interceptor to include the auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle token expiration
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
