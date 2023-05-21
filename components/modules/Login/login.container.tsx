import { signIn } from 'next-auth/react'

import { useNotification } from '../../../utils/hooks/notification'
import { LoginComponent } from './login.component'
import { LoginHandler } from './login.models'

export const LoginContainer = () => {
  const { onError } = useNotification()

  const handleLogin: LoginHandler = async ({ email, password }) => {
    try {
      const response = await signIn('credentials', { email, password, redirect: false })

      if (!response) return
      const { ok, status } = response

      if (ok) return

      throw new Error(
        status === 401
          ? 'Tus datos de acceso no son correctos. Por favor, intenta nuevamente.'
          : 'Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.',
      )
    } catch (error) {
      if (!(error instanceof Error)) return

      onError(error.message)
    }
  }

  return <LoginComponent onLogin={handleLogin} />
}
