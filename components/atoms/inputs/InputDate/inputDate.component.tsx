import { useEffect, useId, useState } from 'react'

import theme from '@folcode/clabs.others.theme-provider'
import { TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'

import { InputBase } from '../InputBase'
import { InputDateLocalStyles } from './inputDate.styles'

export type InputDateComponentProps = InputGeneralProps & {
  placeholder?: string
  maxDate?: dayjs.Dayjs
  minDate?: dayjs.Dayjs
  fullWidth?: boolean
  isDisabled?: boolean
}

export const InputDateComponent = (props: InputDateComponentProps) => {
  // Props
  const {
    id: idProp,
    name,
    rules = { required: false, disabled: false },
    className = '',

    label,
    labelAsUppercase = true,

    withLeftSpacing = true,
    fullWidth,
    placeholder = 'DD/MM/YYYY',
    maxDate,
    minDate,
    isDisabled = false,
  } = props

  // Hooks
  const inputId = useId()
  const { register, watch, setValue } = useFormContext()

  // States
  const [date, setDate] = useState<Dayjs | null | string>(null)

  // Data
  const { onChange, ...registerParams } = register(name, rules)
  const watchedValue = watch(name) as string | undefined

  // Methods
  const convertDateTo = (value: Dayjs | null, format = 'YYYY/MM/DD') => dayjs(value).format(format)

  // const minDays = dayjs(minDate).add(1, 'day')

  // Handlers
  const handleChange = (newValue: Dayjs | null) => {
    const formattedDate = convertDateTo(newValue)
    setDate(formattedDate)
    if (formattedDate !== null) {
      setValue(name, formattedDate)
    }
  }

  // Effects
  useEffect(() => {
    if (watchedValue === undefined) {
      setDate(null)
      return
    }

    setDate(watchedValue)
  }, [watchedValue])

  // Styles
  const fontStyles = {
    fontFamily: `${theme.typography.name}`,
    color: `${theme.colors.neutrals[600]}`,
    fontSize: '0.8rem',
    lineHeight: '1rem',
    fontWeight: '600',
    paddingLeft: '0.375rem',
  }

  // Base Props
  const inputProps = {
    id: idProp ?? inputId,
    ...registerParams,
    onChange: handleChange,
  }

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={date}
          className="MuiInputBase-root-MuiOutlinedInput-root"
          InputProps={{
            id: idProp ?? inputId,
            sx: fontStyles,
          }}
          inputFormat="DD/MM/YYYY"
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder,
              }}
              fullWidth={fullWidth}
            />
          )}
          maxDate={maxDate}
          minDate={minDate}
          disabled={isDisabled}
          {...inputProps}
        />
      </LocalizationProvider>

      <style jsx>{InputDateLocalStyles}</style>
    </InputBase>
  )
}
