/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useId, useState } from 'react'

import { ChevronDown, CloseOutline } from '@easy-eva-icons/react'
import theme from '@folcode/clabs.others.theme-provider'
import { useFormContext } from 'react-hook-form'
import Select, {
  ClearIndicatorProps,
  components,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  MenuProps,
  SingleValue,
  ThemeConfig,
} from 'react-select'

import { InputBase } from 'components/atoms/inputs/InputBase'
import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'

import { inputSelectStyles } from './inputSelect.styles'

// Constants
const { colors } = theme

// Types
export type InputSelectOption = {
  id: number
  name: string
  displayName?: string
  disabled?: boolean
}

type FormContext = Record<string, InputSelectOption | null>

type Option = {
  value: string
  label: string
  displayName?: string
  isDisabled?: boolean
}

export type InputSelectComponentProps = InputGeneralProps & {
  options: InputSelectOption[]

  placeholder?: string
  icon?: React.ReactNode
  size?: 'small' | 'medium' | 'large'

  withSearch?: boolean
  withClear?: boolean

  menuPosition?: 'top' | 'bottom'
}

export const InputSelectComponent = (props: InputSelectComponentProps) => {
  // Props
  const {
    id: idProp,
    name,
    rules = { required: false, disabled: false },
    className = '',

    label,
    labelAsUppercase = true,

    withLeftSpacing = true,

    options: optionsProp,

    placeholder,
    icon = null,
    size = 'medium',

    withSearch = false,
    withClear = false,

    menuPosition,
  } = props

  // Hooks
  const inputId = useId()

  const { setValue, register, watch, getFieldState, formState } = useFormContext<FormContext>()

  // States
  const [options, setOptions] = useState<Option[]>()
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const [showMenu, setShowMenu] = useState(false)

  // Data
  const { onBlur, onChange, ref } = register(name, rules)
  const watchedValue = watch(name)

  const { error } = getFieldState(name, formState)

  // Methods
  const convertToOption = (option: InputSelectOption): Option => ({
    value: String(option.id),
    label: option.name,
    displayName: option.displayName,
    isDisabled: option.disabled,
  })

  const convertToValue = (option: Option): InputSelectOption => ({
    id: Number(option.value),
    name: option.label,
    displayName: option.displayName,
    disabled: option.isDisabled,
  })

  // Handlers
  const handleChange = (option: SingleValue<Option>) => {
    const newValue = option !== null ? convertToValue(option) : null
    void onChange({ target: { value: newValue } })
    setValue(name, newValue)
  }

  // Effects
  useEffect(() => {
    const newValue = optionsProp.map((option) => convertToOption(option))
    setOptions(newValue)
  }, [optionsProp])

  useEffect(() => {
    if (watchedValue === undefined) {
      setSelectedOption(null)
      return
    }

    const newValue = watchedValue !== null ? convertToOption(watchedValue) : null

    setSelectedOption(newValue)
  }, [watchedValue])

  // Styles
  const reactSelectTheme: ThemeConfig = (currentTheme) => ({
    colors: {
      ...currentTheme.colors,
      primary: colors.primary[500],
      primary25: colors.neutrals[100],
      primary50: colors.primary[200],
      primary75: colors.primary[300],
      neutral50: colors.neutrals[200],
    },
    borderRadius: 64,
    spacing: {
      baseUnit: 8,
      controlHeight: 1,
      menuGutter: 0,
    },
  })

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

  const styleProps = {
    showMenu,
    hasError: !!error,
    size,
    disabled: !!rules.disabled,
  }

  // Render
  const control = (controlProps: ControlProps<Option, false, GroupBase<Option>>) => (
    <components.Control {...controlProps}>
      {icon && (
        <span className={`icon ${controlProps.isDisabled ? 'icon--disabled' : ''}`}>
          {icon}

          <style jsx>{`
            .icon {
              color: ${showMenu ? colors.primary[500] : colors.neutrals[200]};
              display: flex;
              margin-left: 1rem;
              margin-right: ${size === 'large' ? '0rem' : '0.5rem'};
              font-size: ${size === 'large' ? '1.5rem' : '1rem'};
            }

            .icon--disabled {
              color: ${colors.neutrals[200]};
            }
          `}</style>
        </span>
      )}

      {controlProps.children}
    </components.Control>
  )

  const menu = (menuProps: MenuProps<Option, false, GroupBase<Option>>) => (
    <>
      <components.Menu {...menuProps} />

      <div className={`figure figure--${menuProps.placement === 'bottom' ? 'bottom' : 'top'}`} />

      <style jsx>
        {`
          .figure--top,
          .figure--bottom {
            position: absolute;
            inset: 0;

            border: 0.125rem solid ${colors.primary[500]};
            border-top: none;
            border-bottom: none;
          }

          .figure--top {
            bottom: 50%;
          }

          .figure--bottom {
            top: 50%;
          }
        `}
      </style>
    </>
  )

  const dropdownIndicator = (
    dropdownIndicatorProps: DropdownIndicatorProps<Option, false, GroupBase<Option>>,
  ) => (
    <components.DropdownIndicator {...dropdownIndicatorProps}>
      <ChevronDown />
    </components.DropdownIndicator>
  )

  const clearIndicator = (
    clearIndicatorProps: ClearIndicatorProps<Option, false, GroupBase<Option>>,
  ) => (
    <components.ClearIndicator {...clearIndicatorProps}>
      <CloseOutline />
    </components.ClearIndicator>
  )

  return (
    <InputBase {...inputBaseProps}>
      <Select
        // General
        id={idProp ?? inputId}
        name={name}
        ref={ref}
        // Values
        value={selectedOption}
        options={options}
        // Events
        onBlur={(event) => void onBlur(event)}
        onChange={handleChange}
        onMenuOpen={() => setShowMenu(!rules.disabled)}
        onMenuClose={() => setShowMenu(false)}
        // Others
        placeholder={placeholder ?? ''}
        isSearchable={withSearch}
        isClearable={withClear}
        isLoading={optionsProp === undefined}
        menuPlacement={menuPosition ?? 'auto'}
        {...(rules.disabled && { isClearable: false, isSearchable: false, menuIsOpen: false })}
        noOptionsMessage={() => 'No se encontraron opciones'}
        getOptionLabel={(option) => option.displayName ?? option.label}
        maxMenuHeight={150}
        components={{
          IndicatorSeparator: () => null,
          Control: control,
          Menu: menu,
          ClearIndicator: clearIndicator,
          DropdownIndicator: dropdownIndicator,
        }}
        // Styles
        theme={reactSelectTheme}
        styles={inputSelectStyles(styleProps)}
      />
    </InputBase>
  )
}
