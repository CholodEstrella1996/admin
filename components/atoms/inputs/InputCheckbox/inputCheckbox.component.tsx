/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useId, useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Checkbox } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { InputBase } from '../InputBase'
import { InputGeneralProps } from '../InputBase/inputBase.models'
import { inputCheckboxLocalStyles } from './inputCheckbox.styles'

// Constants
const { colors } = theme

const icons = {
  unckeckedIcon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="18" height="18" rx="2" stroke="#3C50B5" strokeWidth="2" />
    </svg>
  ),

  checkedIcon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="3" fill="#3C50B5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0385 7.42926C12.3926 6.96204 13.0718 6.86049 13.5555 7.20244C14.0393 7.54439 14.1444 8.20035 13.7904 8.66757L10.4312 13.1005C10.0688 13.5787 9.36974 13.6323 8.93862 13.215L6.31701 10.677C5.89362 10.2671 5.89443 9.6033 6.31884 9.19438C6.74324 8.78546 7.43052 8.78625 7.85391 9.19614L9.49539 10.7853L12.0385 7.42926Z"
        fill="white"
      />
    </svg>
  ),

  indeterminate: (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.833496" width="20" height="20" rx="3" fill="#3C50B5" />
      <line
        x1="6.8335"
        y1="10"
        x2="14.8335"
        y2="10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

// Types
export type InputCheckboxOption = {
  id: number
  name: string
  displayName?: string
  disabled?: boolean
  indeterminate?: boolean
}

type SelectedOption = InputCheckboxOption

export type InputCheckboxComponentProps = InputGeneralProps & {
  options: InputCheckboxOption[]

  titlePosition?: 'right' | 'left'
}

export const InputCheckboxComponent = (props: InputCheckboxComponentProps) => {
  // Props
  const {
    id: idProp,
    name,
    rules = { required: false, disabled: false },
    className = '',

    label,
    labelAsUppercase = true,

    withLeftSpacing = false,

    options: optionsProp,

    titlePosition = 'left',
  } = props

  // Hooks
  const inputId = useId()
  const { register, watch, setValue } = useFormContext()

  // Exceptions
  const isRequired = rules.required
  if (isRequired) {
    throw new Error(
      "InputCheckbox doesn't support required prop. You should implement it in this component",
    )
  }

  const hasMoreRules = Object.keys(rules).length > 2
  if (hasMoreRules) {
    throw new Error(
      "InputCheckbox doesn't support other rules than required and disabled. You should implement it in this component",
    )
  }

  // States
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([])

  // Data
  const { onChange, ref } = register(name, rules)
  const watchedValue = watch(name) as SelectedOption[] | undefined

  // Methods
  const getSelectedOptions = (isSelected: boolean, currentOption: InputCheckboxOption) => {
    if (!isSelected) {
      const withSelected = [...selectedOptions, currentOption]
      return withSelected
    }

    const withoutSelected = selectedOptions.filter(
      (selectedOption) => selectedOption.id !== currentOption.id,
    )
    return withoutSelected
  }

  // Handlers
  // Effects
  useEffect(() => {
    if (watchedValue === undefined) return

    setSelectedOptions(watchedValue)
  }, [watchedValue])

  // Styles
  // Base Props
  const inputBaseProps = {
    id: idProp ?? inputId,
    name,
    rules,
    label,
    labelAsUppercase,
    className,
    withLeftSpacing,
  }

  // Render
  return (
    <InputBase {...inputBaseProps}>
      <div ref={ref} className="container">
        {optionsProp.map((option) => {
          const isSelected = selectedOptions?.some(
            (selectedOption) => selectedOption.id === option.id,
          )

          return (
            <div
              key={option.id}
              className={`checkbox ${titlePosition === 'right' ? 'checkbox--right' : ''} ${
                withLeftSpacing ? 'checkbox--with-left-spacing' : ''
              }`}>
              <Typography variant="s2" color={colors.neutrals[500]} className="title">
                {option.displayName ?? option.name}
              </Typography>

              <Checkbox
                id={`${idProp ?? inputId}-${option.id}`}
                checked={isSelected}
                indeterminate={option.indeterminate}
                onChange={() => {
                  const newValue = getSelectedOptions(isSelected, option)

                  void onChange({ target: { value: newValue } })
                  setValue(name, newValue)
                }}
                icon={icons.unckeckedIcon}
                checkedIcon={icons.checkedIcon}
                indeterminateIcon={icons.indeterminate}
              />
            </div>
          )
        })}
      </div>

      <style jsx>{inputCheckboxLocalStyles}</style>
    </InputBase>
  )
}
