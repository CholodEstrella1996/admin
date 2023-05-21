// Main model
export type AuthModel = {
  LoginRequest: LoginRequest
  LoginResponse: LoginResponse

  LogoutRequest: LogoutRequest
  LogoutResponse: LogoutResponse

  RefreshTokenRequest: RefreshTokenRequest
  RefreshTokenResponse: RefreshTokenResponse

  GetUserInfoRequest: GetUserInfoRequest
  GetUserInfoResponse: GetUserInfoResponse
}

// Login
type LoginRequest = {
  client_id: string
  client_secret: string
  grant_type: 'password'
  username: string
  password: string
}
type LoginResponse = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: 'Bearer'
  'not-before-policy': number
  session_state: string
  scope: string
}

// logout
type LogoutRequest = {
  client_id: string
  client_secret: string
  refresh_token: string
}
type LogoutResponse = never

// refreshToken
type RefreshTokenRequest = {
  client_id: string
  client_secret: string
  grant_type: 'refresh_token'
  refresh_token: string
}
type RefreshTokenResponse = LoginResponse

// GetUserInfo
type GetUserInfoRequest = never
type GetUserInfoResponse = {
  sub: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}
