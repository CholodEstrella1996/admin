/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useId } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { useFormContext } from 'react-hook-form'

import { InputBase } from 'components/atoms/inputs/InputBase'
import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'

import { inputToggleLocalStyles } from './inputToggle.styles'

const { colors } = theme

export type InputToggleComponentProps = InputGeneralProps & {
  title: string

  colors?: {
    checked: string
    unchecked: string
  }
  withLabelRight?: boolean
}

export const InputToggleComponent = (props: InputToggleComponentProps) => {
  // Props
  const {
    id: idProp,
    name,
    rules: rulesProp = { required: false, disabled: false },
    className = '',

    label,
    labelAsUppercase = true,

    withLeftSpacing = false,

    title,

    colors: colorsProp = {
      checked: colors.primary[500],
      unchecked: colors.primary[200],
    },
    withLabelRight = false,
  } = props
  const { disabled, ...rules } = rulesProp

  // Hooks
  const inputId = useId()
  const {
    register,
    setError,
    watch,
    formState: { isSubmitted },
  } = useFormContext()

  // Effects
  useEffect(() => {
    if (!rules.required || !isSubmitted) return

    const watchedValue = !!watch(name)
    if (!watchedValue) setError(name, { type: 'required' })
  }, [isSubmitted])

  // Styles
  const hoverColor = {
    checked: colorsProp.checked !== colors.primary[500] ? colorsProp.checked : colors.primary[700],
    unchecked:
      colorsProp.unchecked !== colors.primary[200] ? colorsProp.unchecked : colors.primary[300],
  }

  const CssVariables = {
    '--checked-color': colorsProp.checked,
    '--unchecked-color': colorsProp.unchecked,
    '--checked-hover-color': hoverColor.checked,
    '--unchecked-hover-color': hoverColor.unchecked,
  }

  // Base Props
  const inputBaseProps = {
    id: idProp ?? inputId,
    name,
    rules,
    label,
    labelAsUppercase,
    className,
    style: CssVariables,
    withLeftSpacing,
  }

  // Render
  return (
    <InputBase {...inputBaseProps}>
      <div className="container">
        <div className="input-container">
          {!withLabelRight && (
            <Typography variant="s2" color={colors.neutrals[500]} className="title">
              {title}
            </Typography>
          )}

          <input
            id={idProp ?? inputId}
            type="checkbox"
            disabled={disabled}
            className="input"
            {...register(name, rules)}
          />
          {withLabelRight && (
            <Typography variant="s2" color={colors.neutrals[500]} className="title-right">
              {title}
            </Typography>
          )}
        </div>
      </div>

      <style jsx>{inputToggleLocalStyles}</style>
    </InputBase>
  )
}
