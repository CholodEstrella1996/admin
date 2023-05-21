import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { BadgeStyles } from './badge.styles'

const { colors } = theme

type BadgeProps = {
  message:
    | 'Activa'
    | 'Suspendida'
    | 'En Cancelación'
    | 'Expirada'
    | 'Pendiente'
    | 'Cancelada'
    | 'Neutro500'
    | 'Neutro200'
    | 'Primary500'
    | 'Si'
    | 'No'
    | 'Technology500'
    | 'Inactiva'
    | 'Pagado'
    | 'Rechazado'
  value?: string
  className?: string
}

export const BadgeComponent = (props: BadgeProps) => {
  const { message, value, className = '' } = props

  const messages = {
    // Table subscription
    Activa: colors.semantic.success,
    Suspendida: colors.semantic.warning,
    'En Cancelación': colors.semantic.warning,
    Expirada: colors.neutrals[500],
    Pendiente: colors.technology[500],
    Cancelada: colors.semantic.danger,
    Si: colors.semantic.success,
    No: colors.semantic.danger,
    Inactiva: colors.semantic.danger,
    Rechazado: colors.semantic.danger,
    Pagado: colors.semantic.success,

    // Component ProgressInstall
    Neutro500: colors.neutrals[500],
    Neutro200: colors.neutrals[200],
    Primary500: colors.primary[500],
    Technology500: colors.technology[500],
  }

  return (
    <div className={`badge ${className}`} style={{ '--background-color': messages[message] }}>
      <Typography variant="s2">{value ?? message}</Typography>
      <style jsx>{BadgeStyles}</style>
    </div>
  )
}
