import axios from 'axios'

import { AuthModel } from 'services/models/auth.model'

const BASE_URL = `${process.env.AUTH_BASE_URL}/auth/realms/${process.env.AUTH_REALM}`
const URL = `${BASE_URL}/protocol/openid-connect`

const auth = {
  login: async (email: string, password: string) => {
    const data: AuthModel['LoginRequest'] = {
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_SECRET,
      grant_type: 'password',
      username: email,
      password,
    }
    const params = new URLSearchParams(data)

    const response = await axios.post<AuthModel['LoginResponse']>(`${URL}/token`, params)

    return response
  },
  register: () => {},
  refreshToken: async (refreshToken: string) => {
    const data: AuthModel['RefreshTokenRequest'] = {
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }
    const params = new URLSearchParams(data)

    const response = await axios.post<AuthModel['RefreshTokenResponse']>(`${URL}/token`, params)

    return response
  },
  logout: async (refreshToken: string) => {
    const data: AuthModel['LogoutRequest'] = {
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_SECRET,
      refresh_token: refreshToken,
    }
    const params = new URLSearchParams(data)

    const response = await axios.post<AuthModel['LogoutResponse']>(`${URL}/logout`, params)

    return response
  },
  getUserInfo: (token: string) => {
    const headers = { Authorization: `Bearer ${token}` }

    const response = axios.get<AuthModel['GetUserInfoResponse']>(`${URL}/userinfo`, { headers })

    return response
  },
}

export default auth
