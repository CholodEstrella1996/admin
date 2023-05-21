import { AlertCircleOutline } from '@easy-eva-icons/react'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Controller, useFormContext } from 'react-hook-form'
import Select, { MultiValue, SingleValue } from 'react-select'

import { SelectProps, OptionProps } from './select.models'
import { SelectStyles, SelectGlobalStyles } from './select.styles'

const SelectComponent = (props: SelectProps) => {
  const {
    name = '',
    label = '',
    size = 'small',
    placeholder,
    isClearable,
    multiple = false,
    disabled = false,
    required = false,
    className = '',
    options,
    isSearchable = true,
  } = props

  const { colors } = theme

  const { control } = useFormContext()

  const style = {
    '--cursor-hover': disabled ? 'not-allowed' : 'unset',
  }

  const sendData = (val: MultiValue<OptionProps> | SingleValue<OptionProps>) => {
    const optionMulti = val as OptionProps[]
    const optionSingle = val as OptionProps
    if (multiple)
      return optionMulti?.length ? optionMulti?.map((v: OptionProps) => v.value) : undefined
    return optionSingle
  }

  return (
    <>
      <div className={`select__container ${className}`} style={style}>
        <label htmlFor="select" className="select__label">
          <Typography
            variant="label"
            color={!disabled ? colors.neutrals[400] : colors.neutrals[200]}>
            {label.toUpperCase()}
          </Typography>
        </label>
        <Controller
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <>
              <Select
                isMulti={multiple}
                isClearable={isClearable}
                id={name}
                isSearchable={isSearchable}
                ref={ref}
                classNamePrefix={`cl-select--${size}`}
                options={options}
                value={options.find((c) => c.value === value)}
                placeholder={placeholder}
                onChange={(val: MultiValue<OptionProps> | SingleValue<OptionProps>) =>
                  onChange(sendData(val))
                }
                isDisabled={disabled}
                menuPlacement="auto"
                styles={{
                  control: (styles) => ({
                    ...styles,
                    border: error
                      ? `2px solid ${colors.semantic.danger}`
                      : `2px solid ${colors.neutrals[300]}`,
                  }),
                }}
              />
              {error && (
                <>
                  <span className="warning__icon">
                    <AlertCircleOutline fontSize={20} />
                  </span>
                  <span className="warning__msg">
                    <Typography variant="c1" color={colors.semantic.danger}>
                      Selecciona una opción
                    </Typography>
                  </span>
                </>
              )}
            </>
          )}
          name={name}
          rules={{ required }}
          control={control}
        />
      </div>
      <style jsx>{SelectStyles}</style>
      <style jsx global>
        {SelectGlobalStyles}
      </style>
    </>
  )
}

export default SelectComponent
