import { useEffect, useState } from 'react'

import theme, { ThemeProvider } from '@folcode/clabs.others.theme-provider'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'
import { SnackbarProvider } from 'notistack'

import Spinner from 'components/atoms/Spinner'
import { AdminLayout } from 'components/molecules/AdminLayout'

const { colors } = theme
const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(false)

  const start = () => setIsLoadingPage(true)

  const complete = () => setIsLoadingPage(false)

  useEffect(() => {
    setShowChild(true)

    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', complete)
    Router.events.on('routeChangeError', complete)

    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', complete)
      Router.events.off('routeChangeError', complete)
    }
  }, [])

  if (!showChild || typeof window === 'undefined') return null

  return (
    <ThemeProvider>
      <Head>
        <title>CloudLabs</title>
      </Head>
      <SnackbarProvider
        hideIconVariant
        maxSnack={1}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
        <SessionProvider session={pageProps.session}>
          <AdminLayout>{isLoadingPage ? <Spinner /> : <Component {...pageProps} />}</AdminLayout>
        </SessionProvider>
      </SnackbarProvider>

      <style jsx global>{`
        ul {
          list-style: none;
        }
        *::-webkit-scrollbar {
          width: 0.75rem;
        }

        *::-webkit-scrollbar-track {
          background: ${colors.neutrals[50]};
        }

        *::-webkit-scrollbar-thumb {
          background-color: ${colors.neutrals[200]};
          border-radius: 1.25rem;
        }
      `}</style>
    </ThemeProvider>
  )
}

export default App
