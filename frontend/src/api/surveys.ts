import { instance } from './axios'
import { AxiosResponse } from 'axios'

interface Survey {
  id: number
  title: string
  description: string
  points_reward: number
}

interface ApiResponse<T> {
  data: T
  message: string
}

export const surveysApi = {
  getAll: (): Promise<AxiosResponse<ApiResponse<Survey[]>>> => {
    return instance.get('/surveys')
  },
  getById: (id: number): Promise<AxiosResponse<ApiResponse<Survey>>> => {
    return instance.get(`/surveys/${id}`)
  },
  submit: (surveyId: number, answers: Record<string, string>) => {
    return instance.post(`/surveys/${surveyId}/submit`, { answers })
  },
}
