import { MouseEventHandler } from 'react'

import { Avatar } from '@folcode/clabs.atoms.avatar'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { CheckCircle } from '@mui/icons-material'

import { TextIconLocalStyles } from './textIcon.styles'

const { colors } = theme

export type TextIconComponentProps = {
  id: string
  icon?: string
  text: string
  selected?: boolean

  size?: 'small' | 'medium' | 'large'

  colorAvatar?: string

  onClick?: MouseEventHandler

  className?: string
}

export const TextIconComponent = (props: TextIconComponentProps) => {
  // Props
  const {
    id,
    icon,
    text,
    selected = false,

    size = 'small',

    colorAvatar,

    onClick = () => {},

    className,
  } = props

  // Render
  return (
    <div className={className}>
      <div className="container">
        <button type="button" className={`button button--${size}`} onClick={onClick}>
          <div className="caption">
            <Avatar name={id} size={size} image={icon} color={colorAvatar} />

            <Typography
              variant={size === 'large' ? 'h5' : 's2'}
              weight={size === 'large' ? 'bold' : 'semibold'}
              color={size === 'large' ? colors.neutrals[500] : colors.neutrals[400]}
              className={`text--${size}`}>
              {text}
            </Typography>
          </div>

          {selected ? (
            <CheckCircle className="check-icon" htmlColor={colors.primary[500]} />
          ) : (
            <div />
          )}
        </button>
      </div>

      <style jsx>{TextIconLocalStyles}</style>
    </div>
  )
}
