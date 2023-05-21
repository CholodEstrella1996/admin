import { AxiosError, AxiosInstance } from 'axios'
import Router from 'next/router'

const errorInterceptor = (axiosInstance: AxiosInstance) =>
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      if (
        !Router.asPath.includes('topic') &&
        error.response?.status !== 200 &&
        error.response?.status !== 409
      ) {
        await Router.push('/error')
        return Promise.reject(error)
      }

      return Promise.reject(error)
    },
  )

export default errorInterceptor
