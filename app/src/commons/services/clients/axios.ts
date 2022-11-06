import { ITokens } from '@/commons/typings'
import { jwt } from '@/commons/utils'
import { default as baseAxios } from 'axios'

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:8090',
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

const refreshTokens = async () => {
  const tokens = jwt.getTokensFromStorage()
  try {
    if (tokens.refresh) {
      const newTokens = await axios.post('/api/users/auth/refresh/', {
        refresh: tokens.refresh
      })
      return newTokens.data as ITokens
    }
  } catch (e) {
    console.error(e)
  }

  return null
}

privateAxios.interceptors.request.use(
  (config) => {
    if (!config.headers?.Authorization) {
      const tokens = jwt.getTokensFromStorage()
      if (tokens && config.headers) {
        config.headers['Authorization'] = `Bearer ${tokens.access}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config
    const unauthorizedHttpCodes = [401, 403]
    if (
      unauthorizedHttpCodes.includes(error?.response?.status) &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true
      const newTokens = await refreshTokens()
      if (newTokens) {
        jwt.setAccessTokenToStorage(newTokens)
        prevRequest.headers['Authorization'] = `Bearer ${newTokens.access}`
        return privateAxios(prevRequest)
      }
    }

    if (
      unauthorizedHttpCodes.includes(error?.response?.status) &&
      prevRequest?.sent
    ) {
      delete prevRequest.headers['Authorization']
      jwt.removeTokensFromStorage()
    }
    return Promise.reject(error)
  }
)

/**
 * END JWT Interceptors for {privateAxios}
 */
