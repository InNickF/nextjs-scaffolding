import { default as baseAxios } from 'axios'

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/',
  header: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export const axios = baseAxios.create(axiosConfig)
export const privateAxios = baseAxios.create(axiosConfig)

/**
 * JWT Interceptors for {privateAxios}
 */
interface ITokens {
  access: string
  refresh: string
}
const getTokensFromStorage = () => {
  const access = window.localStorage.getItem('access')
  const refresh = window.localStorage.getItem('refresh')
  return { access, refresh } as ITokens
}
const setTokensToStorage = (tokens: ITokens) => {
  window.localStorage.setItem('access', tokens.access)
  window.localStorage.setItem('refresh', tokens.refresh)
}
const removeTokensFromStorage = () => {
  window.localStorage.removeItem('access')
  window.localStorage.removeItem('refresh')
}
const refreshTokens = async () => {
  const tokens = getTokensFromStorage()
  try {
    const newTokens = await privateAxios.post('auth/refresh/', {
      refresh: tokens.refresh
    })
    return newTokens.data as ITokens
  } catch {}

  return null
}

privateAxios.interceptors.request.use(
  (config) => {
    if (config.headers?.Authorization) {
      const tokens = getTokensFromStorage()
      if (tokens) {
        config.headers['Authorization'] = `Bearer ${tokens.access}`
      }
      return config
    }
  },
  (error) => Promise.reject(error)
)

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true
      const newTokens = await refreshTokens()
      if (newTokens) {
        setTokensToStorage(newTokens)
        prevRequest.headers['Authorization'] = `Bearer ${newTokens.access}`
        return privateAxios(prevRequest)
      }
    }
    if (error?.response?.status === 401) {
      delete prevRequest.headers['Authorization']
      removeTokensFromStorage()
    }
    return Promise.reject(error)
  }
)
/**
 * END JWT Interceptors for {privateAxios}
 */
