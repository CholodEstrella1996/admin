import NextAuth, { NextAuthOptions, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

import auth from 'services/modules/auth.module'

const getNewToken = async (currentToken: JWT): Promise<JWT> => {
  try {
    const { data, status } = await auth.refreshToken(currentToken.refreshToken)

    if (status !== 200) throw new Error('RefreshAccessTokenError')

    return {
      ...currentToken,
      expiration: Date.now() + data.expires_in * 1000,
      token: data.access_token,
      refreshToken: data.refresh_token,
      error: null,
    }
  } catch {
    return { ...currentToken, error: 'RefreshAccessTokenError' }
  }
}

const options: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  events: { signOut: async ({ token }) => void auth.logout(token.refreshToken) },
  callbacks: {
    jwt: async ({ token: currentToken, user }) => {
      // Save initial data in first time
      if (user) {
        const { token, refreshToken, image, expiration } = user

        return {
          ...currentToken,
          token,
          refreshToken,
          picture: image,
          expiration: Date.now() + expiration * 1000,
        }
      }

      // Check if token is expired, if so, get a new one
      const tokenIsExpired = Date.now() > currentToken.expiration
      if (tokenIsExpired) return getNewToken(currentToken)

      // Return current token
      return currentToken
    },
    session: async ({ session, token }) => ({ ...session, token: token.token }),
  },
  providers: [
    {
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: { email: {}, password: {} },
      options: {},
      authorize: async (credentials) => {
        try {
          if (!credentials) return null

          // Login with email and password
          const loginResponse = await auth.login(credentials.email, credentials.password)
          if (!loginResponse) return null

          // Get user info from Keycloak
          const {
            access_token: token,
            refresh_token: refreshToken,
            expires_in: expiration,
          } = loginResponse.data
          const { data: userInfo } = await auth.getUserInfo(token)
          const { sub: id, email, name } = userInfo

          // TODO: Get profile image of user

          // Create user object
          const user: User = {
            id,

            email,
            name,
            image: null,

            token,
            refreshToken,
            expiration,
          }

          return user
        } catch {
          return null
        }
      },
    },
  ],
}

export default NextAuth(options)
