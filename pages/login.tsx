import { useSession } from 'next-auth/react'

import Spinner from 'components/atoms/Spinner'
import { Login } from 'components/modules/Login'

const LoginPage = () => {
  const { status } = useSession()
  return status === 'unauthenticated' ? <Login /> : <Spinner />
}

export default LoginPage
