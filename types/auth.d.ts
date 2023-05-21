import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User extends DefaultUser {
    token: string
    refreshToken: string
    expiration: number
  }

  interface Session extends DefaultSession {
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    token: string
    refreshToken: string
    expiration: number

    image: string | null

    error: string | null
  }
}
