import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { ErrorOutline } from '@mui/icons-material'
import { useRouter } from 'next/router'

import { errorFallbackLocalStyles } from './errorFallback.styles'

export const ErrorFallbackComponent = () => {
  const router = useRouter()

  return (
    <div role="alert" className="error-fallback__container">
      <div className="error-fallback__content">
        <div className="error-fallback__icon">
          <ErrorOutline fontSize="inherit" />
        </div>

        <div className="error-fallback__caption">
          <Typography variant="h1" color={theme.colors.neutrals[500]}>
            Ha ocurrido un error
          </Typography>

          <Typography variant="s1" color={theme.colors.neutrals[300]}>
            Algo no salió bien. Por favor, inténtelo de nuevo más tarde.
          </Typography>
        </div>
        <div className="error-fallback-button">
          <Button variant="outlined" size="large" onClick={() => void router.push('/area')}>
            Volver a la página principal
          </Button>
          <Button variant="contained" size="large" onClick={() => router.back()}>
            Volver a Intentar
          </Button>
        </div>
      </div>

      <style jsx>{errorFallbackLocalStyles}</style>
    </div>
  )
}
