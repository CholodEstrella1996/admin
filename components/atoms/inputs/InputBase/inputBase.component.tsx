import { ReactNode } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { FieldError, useFormContext } from 'react-hook-form'

import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'
import errorMessages from 'constants/errorMessages.constants'

// Constants
const { colors } = theme

// Types
export type InputBaseComponentProps = InputGeneralProps & {
  children: ReactNode

  style?: React.CSSProperties
}

export const InputBaseComponent = (props: InputBaseComponentProps) => {
  // Props
  const {
    id,
    name,
    rules,
    className = '',

    label,
    labelAsUppercase,

    withLeftSpacing,

    children,
    style,
  } = props

  // Hooks
  const { getFieldState, formState } = useFormContext()
  const { error } = getFieldState(name, formState)

  // Methods
  const getErrorMessage = (errorSource: FieldError): string => {
    const {
      generic,
      email,
      password,
      required,
      pattern,
      valueAsNumber,
      valueAsDate,
      value,
      disabled,
      deps,
      min,
      max,
      minLength,
      maxLength,
    } = errorMessages.form

    const messages = {
      generic,

      email,
      password,

      required,

      min: rules?.min
        ? min(String(typeof rules.min === 'object' ? rules.min.value : rules.min))
        : '',
      max: rules?.max
        ? max(String(typeof rules.max === 'object' ? rules.max.value : rules.max))
        : '',

      minLength: rules?.minLength
        ? minLength(
            String(typeof rules.minLength === 'object' ? rules.minLength.value : rules.minLength),
          )
        : undefined,
      maxLength: rules?.maxLength
        ? maxLength(
            String(typeof rules.maxLength === 'object' ? rules.maxLength.value : rules.maxLength),
          )
        : undefined,

      pattern,

      valueAsNumber,
      valueAsDate,
      value,

      disabled,
      deps,
    }

    if (errorSource.message) return errorSource.message

    const message = messages[errorSource.type as keyof typeof messages] ?? messages.generic

    return message
  }

  // Render
  return (
    <div style={style} className={`container ${className}`}>
      {!!label && (
        <label htmlFor={id} className="label">
          <Typography variant="label" color={colors.neutrals[rules?.disabled ? 200 : 400]}>
            {labelAsUppercase ? label.toUpperCase() : label} {rules?.required && <sup>*</sup>}
          </Typography>
        </label>
      )}

      <div className="inputBase">{children}</div>

      {!!error && (
        <div className="error-message">
          <Typography variant="c1" color={colors.semantic.danger} className="warning__msg">
            {getErrorMessage(error)}
          </Typography>
        </div>
      )}

      <style jsx>{`
        .inputBase {
          display: flex;
          width: 100%;
          align-items: flex-start;
          justify-content: flex-start;
        }

        sup {
          all: unset;
          font-size: 0.65rem;
          top: 0;
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .container .label,
        .container .error-message {
          ${withLeftSpacing ? 'padding-left: 1.5rem;' : ''}
        }
      `}</style>
    </div>
  )
}
