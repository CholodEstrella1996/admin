import { ReactNode } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import {
  CheckCircleRounded,
  ErrorRounded,
  InfoRounded,
  WarningAmberRounded,
} from '@mui/icons-material'

type Type = 'success' | 'error' | 'warning' | 'info'

export type DialogComponentProps = {
  type?: Type
  iconColor?: string
  message: string
  icon?: ReactNode
}

export const DialogComponent = ({
  type = 'info',
  iconColor,
  message,
  icon,
}: DialogComponentProps) => {
  // Color Selector
  const colors: Record<Type, string> = {
    success: theme.colors.semantic.success,
    error: theme.colors.semantic.danger,
    warning: theme.colors.semantic.warning,
    info: theme.colors.primary[300],
  }

  // Data
  const color = iconColor ?? colors[type]
  const iconStyles = { height: '5rem', width: '5rem', color }

  // Icon Selector
  const icons: Record<Type, JSX.Element> = {
    success: <CheckCircleRounded style={iconStyles} />,
    error: <ErrorRounded sx={iconStyles} />,
    warning: <WarningAmberRounded sx={iconStyles} />,
    info: <InfoRounded sx={iconStyles} />,
  }

  // Render
  return (
    <div className="dialog-container">
      {icon ?? icons[type]}

      <Typography color={color} variant="h6">
        {message}
      </Typography>
      <style jsx>{`
        .dialog-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 1rem;
          background-color: ${color}50;
          border-radius: 2rem;
          margin-block: 1rem;
          padding: 1rem;
        }
      `}</style>
    </div>
  )
}
