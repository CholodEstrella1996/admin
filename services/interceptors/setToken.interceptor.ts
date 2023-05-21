import { AxiosInstance } from 'axios'
import { getSession } from 'next-auth/react'

const setTokenInterceptor = (axiosInstance: AxiosInstance) =>
  axiosInstance.interceptors.request.use(async (req) => {
    const session = await getSession()

    if (session && req.headers) {
      req.headers.Authorization = `Bearer ${session.token}`
    }

    return req
  })

export default setTokenInterceptor
