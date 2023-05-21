/* eslint-disable react-hooks/exhaustive-deps */
import { SyntheticEvent, useEffect, useId, useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Clear } from '@mui/icons-material'
import {
  Autocomplete,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  Chip,
  createFilterOptions,
  FilterOptionsState,
  TextField,
} from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { InputBase } from 'components/atoms/inputs/InputBase'
import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'

import { InputChipLocalStyles } from './inputChip.styles'

const { colors, typography } = theme

const filter = createFilterOptions<string>()

export type InputChipComponentProps = InputGeneralProps & {
  options?: string[]

  maxSelectedOptions?: number

  placeholder?: string
}

export const InputChipComponent = (props: InputChipComponentProps) => {
  // Props
  const {
    id: idProp,
    name,
    rules: rulesProp = { required: false, disabled: false },
    className = '',

    label,
    labelAsUppercase = true,

    withLeftSpacing = true,

    options: optionsProp = [],

    maxSelectedOptions,

    placeholder,
  } = props
  const { required, disabled } = rulesProp

  // Exceptions
  if (maxSelectedOptions !== undefined) {
    if (maxSelectedOptions < 1) {
      throw new Error('"maxSelectedOptions" prop must be greater than 0')
    }
  }

  // Hooks
  const inputId = useId()
  const { register, setValue, watch, getFieldState, formState } = useFormContext()

  // States
  const [options, setOptions] = useState<string[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const [inputValue, setInputValue] = useState('')

  // Data
  const watchedValue = watch(name) as string[] | undefined
  const rules = { ...rulesProp, required: required && selectedOptions.length === 0 }
  const { ref, onChange, onBlur, ...registerParams } = register(name, rules)
  const { error } = getFieldState(name, formState)

  // Methods
  const getOnlyNewValues = (prevValues: string[], newValues: string[]) =>
    newValues.filter((value) => !prevValues.includes(value))

  const addNewOptions = (prevOptions: string[], newOptions: string[]) => [
    ...prevOptions,
    ...getOnlyNewValues(prevOptions, newOptions),
  ]

  // Handlers
  const handleChange = (event: SyntheticEvent<Element, Event>, values: string[]) => {
    if (maxSelectedOptions && maxSelectedOptions < values.length) {
      alert(`Solo puede agregar hasta ${maxSelectedOptions} keywords`)
      return
    }

    const convertedValues = values.map((value) =>
      value.includes(`Agregar "`) ? value.replace(`Agregar "`, '').replace(`"`, '') : value,
    )

    convertedValues.forEach((value) => {
      if (options.includes(value)) return

      setOptions((prevOptions) => [...prevOptions, value])
    })

    setValue(name, convertedValues)

    if (event.type !== 'keydown') void onChange(event)
  }

  const handleInputChange = (_: SyntheticEvent<Element, Event>, newInputValue: string) => {
    setInputValue(newInputValue)
  }

  const handleFilterOptions = (values: string[], state: FilterOptionsState<string>) => {
    const filtered = filter(values, state)

    const isExists = !options.some((value) => state.inputValue === value)
    if (state.inputValue !== '' && isExists) {
      filtered.push(`Agregar "${state.inputValue}"`)
    }

    return filtered
  }

  // Effects
  useEffect(() => {
    if (optionsProp.length === 0) return
    setOptions((prevState) => addNewOptions(prevState, optionsProp))
  }, [optionsProp])

  useEffect(() => {
    if (!Array.isArray(watchedValue)) return

    setOptions((prevState) => addNewOptions(prevState, watchedValue))
    setSelectedOptions(watchedValue)
  }, [watchedValue])

  // Styles
  const textFieldStyles = {
    fontFamily: typography.name,
    fontWeight: typography.weight.bold,
    paddingInline: '1.5rem 1rem',
    paddingBlock: `${selectedOptions.length === 0 ? '0.205rem' : '0.026rem'} !important`,

    border: `${error ? colors.semantic.danger : colors.neutrals[300]} 0.125rem solid`,
    borderRadius: '2rem',
    backgroundColor: colors.neutrals.white,

    '&:hover': {
      border: `${error ? colors.semantic.danger : colors.primary[500]} 0.125rem solid`,
    },

    '& .MuiAutocomplete-inputRoot': {
      padding: '0.390rem 0 !important',
      fontSize: '0.75rem',
      fontFamily: typography.name,
      fontWeight: typography.weight.bold,
    },
  }

  const chipStyles = {
    fontSize: '0.75rem',
    fontWeight: typography.weight.semibold,
    backgroundColor: colors.neutrals[50],
    color: colors.neutrals[300],
  }

  const deleteIconStyles = {
    fontSize: '1rem',
    marginLeft: '0',
  }

  // Base Props
  const inputBaseProps = {
    id: idProp ?? inputId,
    name,
    rules: { ...rules, required },
    label,
    labelAsUppercase,
    className,
    withLeftSpacing,
  }

  // Render
  const renderTags = (values: string[], getTagProps: AutocompleteRenderGetTagProps) =>
    values.map((value, index) => {
      const { key, ...chipProps } = getTagProps({ index })

      return (
        <Chip
          key={key}
          sx={chipStyles}
          label={value}
          deleteIcon={<Clear sx={deleteIconStyles} />}
          {...chipProps}
        />
      )
    })

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      inputRef={ref}
      {...registerParams}
      placeholder={selectedOptions.length === 0 ? placeholder : undefined}
      className="textField"
      sx={textFieldStyles}
    />
  )

  return (
    <InputBase {...inputBaseProps}>
      <div className="input-chip">
        <Autocomplete
          // General
          id={idProp ?? inputId}
          options={options}
          value={selectedOptions}
          inputValue={inputValue}
          onChange={handleChange}
          onInputChange={handleInputChange}
          filterOptions={handleFilterOptions}
          // Renders
          renderInput={renderInput}
          renderTags={renderTags}
          // Others
          disabled={disabled}
          freeSolo
          multiple
          fullWidth
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          disableClearable
          sx={{ fontFamily: typography.name }}
        />

        {!!maxSelectedOptions && (
          <Typography variant="c1" className="counter">
            {selectedOptions.length}/{maxSelectedOptions}
          </Typography>
        )}
      </div>

      <style jsx>{InputChipLocalStyles}</style>
    </InputBase>
  )
}
