import axios, { AxiosRequestConfig } from 'axios'

import errorInterceptor from './interceptors/error.interceptor'
import setTokenInterceptor from './interceptors/setToken.interceptor'

const config: AxiosRequestConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
}

const api = axios.create(config)

setTokenInterceptor(api)
errorInterceptor(api)

export default api
