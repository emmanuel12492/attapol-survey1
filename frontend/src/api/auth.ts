import { instance } from './axios'
import { AxiosResponse } from 'axios'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  username: string
  email: string
  password: string
}

interface AuthResponse {
  access_token: string
  token_type: string
  user: {
    id: number
    username: string
    email: string
    points: number
  }
}

export const authApi = {
  login: (data: LoginData): Promise<AxiosResponse<AuthResponse>> => {
    return instance.post('/auth/login', data)
  },
  register: (data: RegisterData): Promise<AxiosResponse<AuthResponse>> => {
    return instance.post('/auth/register', data)
  },
  me: (): Promise<AxiosResponse<AuthResponse['user']>> => {
    return instance.get('/auth/me')
  },
}
