/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, ReactNode, useEffect, useId, useState } from 'react'

import { AlertCircleOutline, CloseOutline } from '@easy-eva-icons/react'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { useFormContext } from 'react-hook-form'

import { InputBase } from 'components/atoms/inputs/InputBase'
import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'

import { InputTextLocalStyles } from './inputText.styles'

const { colors } = theme

export type InputTextComponentProps = InputGeneralProps & {
  size?: 'small' | 'medium' | 'large'
  type?: 'email' | 'password' | 'number' | 'text' | 'search' | 'tel' | 'url'

  placeholder?: string
  readOnly?: boolean

  icon?: ReactNode
  iconPosition?: 'left' | 'right'

  multiline?: boolean
  rows?: number
  cols?: number

  withClear?: boolean
  withAutocomplete?: boolean
}

export const InputTextComponent = (props: InputTextComponentProps) => {
  // Props
  const {
    id: idProp,
    name,
    rules = { required: false, disabled: false },
    className = '',

    label,
    labelAsUppercase = true,

    withLeftSpacing = true,

    size = 'medium',
    type = 'text',

    placeholder,
    readOnly = false,

    icon = null,
    iconPosition = 'left',

    multiline = false,
    rows = 1,
    cols = 1,

    withClear = false,
    withAutocomplete = true,
  } = props

  // Hooks
  const inputId = useId()
  const { register, setValue, formState, getFieldState, watch } = useFormContext()
  const { error } = getFieldState(name, formState)

  // States
  const [characterCount, setCharacterCount] = useState(0)

  // Handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target

    setCharacterCount(value.length)

    setValue(name, value)
  }

  // Data
  const { disabled } = rules
  const watchedValue = watch(name) as string | undefined

  const spacingByPosition = (icon ? iconPosition : 'right') === 'right'

  const maxLength =
    (typeof rules.maxLength !== 'number' ? rules.maxLength?.value : rules.maxLength) ?? undefined

  // Effects
  useEffect(() => {
    if (!watchedValue) return

    setCharacterCount(watchedValue.length)

    if (maxLength && watchedValue.length > maxLength) {
      const slicedValue = watchedValue.slice(0, maxLength)
      setValue(name, slicedValue)
    }
  }, [watchedValue, rules.maxLength])

  // Styles
  const CssVariables = {
    '--error-color': error ? colors.semantic.danger : '',
    '--input-default': spacingByPosition ? '1.5rem' : '2.5rem',
    '--input-large': spacingByPosition ? '1.5rem' : '3.5rem',
    '--character-counter-color': colors.neutrals[disabled ? 200 : 300],
    '--icon-color': disabled ? colors.neutrals[200] : colors.primary[500],
    '--show-icon': Boolean(error) && iconPosition === 'right' ? 'none' : 'flex',
  }

  // Base Props
  const inputProps = {
    id: idProp ?? inputId,
    placeholder,
    className: `input input--${size}`,
    readOnly,
    ...register(name, rules),
    onChange: handleChange,
    maxLength,
  }

  const inputBaseProps = {
    id: idProp ?? inputId,
    style: CssVariables,
    name,
    rules,
    label,
    labelAsUppercase,
    className,
    withLeftSpacing,
    autoComplete: withAutocomplete ? 'on' : 'off',
  }

  // Render
  return (
    <InputBase {...inputBaseProps}>
      <div className={`container container--${multiline ? 'multiline' : 'default'}`}>
        {Boolean(icon) && iconPosition === 'left' && (
          <div className={`icon icon--${size}`}>{icon}</div>
        )}

        {multiline ? (
          <textarea cols={cols} rows={rows} {...inputProps} />
        ) : (
          <input type={type} {...inputProps} />
        )}

        {Boolean(maxLength) && (
          <div className="character-counter">
            <Typography variant="c1">
              {characterCount}/{maxLength}
            </Typography>
          </div>
        )}

        {withClear && watchedValue !== '' && (
          <div className={`icon icon--${size} clear-icon`}>
            <CloseOutline
              onClick={() => {
                setValue(name, '')
              }}
            />
          </div>
        )}

        {Boolean(icon) && iconPosition === 'right' && (
          <div className={`icon icon--${size}`}>{icon}</div>
        )}

        {iconPosition === 'left' && Boolean(error) && (
          <div className={`error-icon icon--${size}`}>
            <AlertCircleOutline />
          </div>
        )}
      </div>

      <style jsx>{InputTextLocalStyles}</style>
    </InputBase>
  )
}
