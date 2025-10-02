import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  points_reward: number;
  creator_id: number;
  created_at: string;
  is_active: boolean;
}

export interface Answer {
  question_id: number;
  answer_text: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const formData = new FormData();
      // Handle both email and username
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      
      const response = await api.post('/auth/login', formData, {
        headers: {
          // Don't set Content-Type for FormData
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        return response.data;
      } else {
        throw new Error('No access token received');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials');
      } else if (error.response?.status === 422) {
        throw new Error('Invalid input format');
      } else if (!error.response) {
        throw new Error('Network error - please check your connection');
      }
      throw error;
    }
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};

export const surveyService = {
  async getAllSurveys() {
    const response = await api.get('/surveys');
    return response.data;
  },

  async getSurveyById(id: number) {
    const response = await api.get(`/surveys/${id}`);
    return response.data;
  },

  async submitSurveyResponse(surveyId: number, answers: Answer[]) {
    const response = await api.post(`/surveys/${surveyId}/respond`, { answers });
    return response.data;
  },

  async getUserResponses() {
    const response = await api.get('/surveys/user/responses');
    return response.data;
  }
};
