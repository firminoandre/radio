import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

type ApiResponse<T> = {
  data: T
  status: number
  message?: string
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://de1.api.radio-browser.info/json',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error)
    return Promise.reject(error)
  }
)

const useHttp = () => {
  const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<T> = await api.get(url, config)
    return { data: response.data, status: response.status }
  }

  const post = async <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<T> = await api.post(url, body, config)
    return { data: response.data, status: response.status }
  }

  const put = async <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<T> = await api.put(url, body, config)
    return { data: response.data, status: response.status }
  }

  const patch = async <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<T> = await api.patch(url, body, config)
    return { data: response.data, status: response.status }
  }

  const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<T> = await api.delete(url, config)
    return { data: response.data, status: response.status }
  }

  return { get, post, put, patch, del }
}

export default useHttp
