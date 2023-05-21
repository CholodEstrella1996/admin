import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type RadioProps = {
  name: string
  label?: string
  checked?: boolean
  value: string
  required?: boolean
  onChange: (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => void
}
