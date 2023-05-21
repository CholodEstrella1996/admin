import { UseFormRegisterReturn } from 'react-hook-form'

export type OptionProps = {
  id: number
  value: string | number
  label: string
}

export type SelectProps = {
  id?: string
  name: string
  label: string
  size?: string
  placeholder?: string
  disabled?: boolean
  isClearable?: boolean
  multiple?: boolean
  required?: boolean
  className?: string
  options: OptionProps[]
  register?: UseFormRegisterReturn
  isSearchable?: boolean
}
