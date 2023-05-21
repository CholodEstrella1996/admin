import { ReactNode } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Close } from '@mui/icons-material'

import { ModalLocalStyles } from './Modal.styles'

const { colors } = theme

export type ModalStep = {
  id: number
  element: JSX.Element
}

export type ModalComponentProps = {
  title: string
  onClose: () => unknown
  children: ReactNode
}

export const ModalComponent = (props: ModalComponentProps) => {
  // Props
  const { title, onClose, children } = props

  // Render
  return (
    <div className="container">
      <header className="header">
        <div className="title">
          <Typography weight="bold" variant="h5" color={colors.primary[500]}>
            {title}
          </Typography>

          <span className="close-button">
            <Close onClick={onClose} />
          </span>
        </div>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <Button variant="outlined" size="medium" type="button" onClick={onClose}>
          Volver
        </Button>
      </footer>

      <style jsx>{ModalLocalStyles}</style>
    </div>
  )
}
