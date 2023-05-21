/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const useAuth = () => {
  // Hooks
  const { data: session, status } = useSession()

  const router = useRouter()

  // Effects
  useEffect(() => {
    const sessionIsExpired = session?.error === 'RefreshAccessTokenError'
    if (sessionIsExpired) void signIn()
  }, [session])

  useEffect(() => {
    const isUnauthenticatedPage =
      router.pathname.includes('login') || router.pathname.includes('signup')

    if (status === 'unauthenticated') {
      if (!isUnauthenticatedPage) void router.push('/login')
      return
    }

    if (status === 'authenticated') {
      if (isUnauthenticatedPage) void router.push('/area')
      return
    }

    if (router.pathname === '/') void router.push('/area')
  }, [router.pathname, status])
}

export default useAuth
