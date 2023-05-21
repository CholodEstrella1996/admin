import { RegisterOptions } from 'react-hook-form'

export type InputGeneralProps = {
  id?: string

  name: string
  rules?: Rules

  className?: string

  label?: string
  labelAsUppercase?: boolean

  withLeftSpacing?: boolean
}

type Rules = {
  required?: boolean
  disabled?: boolean

  min?: NumberRule
  max?: NumberRule

  minLength?: NumberRule
  maxLength?: NumberRule
} & Omit<RegisterOptions, 'required' | 'disabled' | 'min' | 'max' | 'minLength' | 'maxLength'>

type NumberRule =
  | number
  | {
      value: number
      message: string
    }
