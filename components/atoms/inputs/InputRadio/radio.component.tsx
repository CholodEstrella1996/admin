import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { RadioProps } from './radio.model'
import { RadioStyles } from './radio.styles'

export const RadioComponent = (props: RadioProps) => {
  const { name, value, onChange, label, checked } = props

  return (
    <div className="radio__container">
      <input
        type="radio"
        className="radio__input"
        id={value}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={value} className="radio__label">
        <Typography variant="h6" color={theme.colors.neutrals[400]}>
          {label}
        </Typography>
      </label>
      <style jsx>{RadioStyles}</style>
    </div>
  )
}
