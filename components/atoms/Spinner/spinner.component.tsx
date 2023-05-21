import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { CircularProgress } from '@mui/material'

const { colors } = theme

type SpinnerProps = {
  withMessage?: boolean
  message?: string
}

const Spinner = (props: SpinnerProps) => {
  const { withMessage = false, message = 'Cargando los datos, por favor espere…' } = props

  return (
    <div className="container">
      <CircularProgress />

      {withMessage && (
        <div className="message">
          <Typography color={colors.neutrals[500]} variant="s2">
            {message}
          </Typography>
        </div>
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
          width: 100%;
          height: 100%;
        }

        .message {
          margin-top: 2rem;
          width: 10rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default Spinner
