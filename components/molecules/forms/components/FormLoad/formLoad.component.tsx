import { FormEvent, ReactNode } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Close } from '@mui/icons-material'

import { FormLoadLocalStyles } from './formLoad.styles'

const { colors } = theme

export type FormLoadStep = {
  id: number
  element: JSX.Element
}

export type FormLoadComponentProps = {
  title: string
  finishButtonText: string

  currentStep?: number
  totalSteps?: number

  // TODO: Discomment these lines when the Button Component has been fixed and migrated
  // loadingButton: boolean

  onNextStep?: () => unknown
  onBackStep?: () => unknown
  onClose: () => unknown
  onSubmit: (event: FormEvent) => unknown

  children: ReactNode
}

export const FormLoadComponent = (props: FormLoadComponentProps) => {
  // Props
  const {
    title,
    finishButtonText,

    currentStep = 1,
    totalSteps = 3,

    // TODO: Discomment these lines when the Button Component has been fixed and migrated
    // loadingButton,

    onNextStep = () => {},
    onBackStep = () => {},
    onClose,
    onSubmit = () => {},

    children,
  } = props

  // Render
  return (
    <form onSubmit={onSubmit} className="container">
      <header className="header">
        <div className="title">
          <Typography weight="bold" variant="h5" color={colors.primary[500]}>
            {title}
          </Typography>

          <span className="close-button">
            <Close onClick={onClose} />
          </span>
        </div>

        <Typography variant="s2" weight="semibold" color={colors.neutrals[400]}>
          Paso {currentStep + 1} de {totalSteps}
        </Typography>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <Button
          variant="outlined"
          size="medium"
          type="button"
          onClick={currentStep === 0 ? onClose : onBackStep}>
          {currentStep === 0 ? 'Cancelar' : 'Volver'}
        </Button>

        <Button
          variant="contained"
          type={totalSteps === currentStep ? 'submit' : 'button'}
          size="medium"
          // TODO: Discomment these lines when the Button Component has been fixed and migrated
          // disabled={loading}
          // loading={loadingButton}
          onClick={totalSteps - 1 === currentStep ? onSubmit : onNextStep}>
          {totalSteps - 1 === currentStep ? finishButtonText : 'Siguiente'}
        </Button>
      </footer>

      <style jsx>{FormLoadLocalStyles}</style>
    </form>
  )
}
