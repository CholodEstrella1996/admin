import theme from '@folcode/clabs.others.theme-provider'
import { GroupBase, StylesConfig } from 'react-select'

import type { InputSelectProps } from '.'

const { colors, typography } = theme

type Option = {
  value: string
  label: string
  displayName?: string
  isDisabled?: boolean
}

type StyleArgs = {
  showMenu: boolean
  hasError: boolean
  size: InputSelectProps['size']
  disabled: boolean
}

type Configs = StylesConfig<Option, false, GroupBase<Option>>

export const inputSelectStyles = ({
  showMenu,
  hasError,
  size = 'medium',
  disabled,
}: StyleArgs): Configs => {
  const control: Configs['control'] = (prevStyles) => {
    const paddings = {
      small: '0.22rem 1rem',
      medium: '0.745rem 1rem',
      large: '0.938rem 1.5rem',
    }

    return {
      ...prevStyles,
      padding: paddings[size],
      paddingLeft: '0.5rem',
      boxShadow: 'none',

      borderColor: colors.neutrals[300],

      fontWeight: typography.weight.semibold,

      borderWidth: '0.125rem',

      '&:hover': {
        borderColor: colors.primary[500],
        cursor: 'pointer',
      },

      ...(hasError && {
        borderColor: colors.semantic.danger,

        '&:hover': {
          borderColor: showMenu ? colors.primary[500] : colors.semantic.danger,
          cursor: 'pointer',
        },
      }),

      ...(showMenu && {
        borderColor: colors.primary[500],
      }),

      ...(disabled && {
        backgroundColor: colors.neutrals.white,
        borderColor: colors.neutrals[300],

        '&:hover': {
          borderColor: colors.neutrals[300],
        },
      }),
    }
  }

  const menu: Configs['menu'] = (prevStyles, { placement }) => ({
    ...prevStyles,

    ...(placement === 'bottom'
      ? {
          borderRadius: '0 0 2rem 2rem',
          border: `0.125rem solid ${colors.primary[500]}`,
          borderTop: 'none',
          boxShadow: 'none',
          padding: '0.75rem',
        }
      : {
          borderRadius: '2rem 2rem 0 0',
          border: `0.125rem solid ${colors.primary[500]}`,
          borderBottom: 'none',
          boxShadow: 'none',
          padding: '0.75rem',
        }),
  })

  const menuList: Configs['menuList'] = (prevStyles) => ({ ...prevStyles, padding: 0 })

  const option: Configs['option'] = (prevStyles, { isSelected }) => ({
    ...prevStyles,
    cursor: 'pointer',
    borderRadius: 16,

    backgroundColor: colors.neutrals.white,

    '&:active': {
      backgroundColor: colors.neutrals[100],
    },

    '&:hover, &:focus, &:focus-within': {
      backgroundColor: colors.neutrals[50],
    },

    ...(isSelected &&
      !disabled && {
        backgroundColor: colors.neutrals[50],
        fontWeight: typography.weight.bold,
        color: colors.neutrals[700],

        '&:hover, &:focus, &:focus-within': {
          backgroundColor: colors.neutrals[100],
        },
      }),

    ...(disabled && {
      cursor: 'not-allowed',

      '&:active, &:hover, &:focus, &:focus-within': {
        backgroundColor: colors.neutrals.white,
      },
    }),
  })

  const dropdownIndicator: Configs['dropdownIndicator'] = (prevStyles) => ({
    ...prevStyles,
    padding: '0',
    paddingLeft: '0.5rem',
    color: colors.neutrals[200],

    '& > *': {
      fontSize: size === 'large' ? '1.75rem' : '1.25rem',
    },

    '&:hover': {
      color: colors.primary[500],
    },

    ...(showMenu && {
      color: colors.primary[500],
    }),

    ...(disabled && {
      color: colors.neutrals[200],

      '&:hover': {
        color: colors.neutrals[200],
      },
    }),
  })

  const clearIndicator: Configs['clearIndicator'] = (prevStyles) => ({
    ...prevStyles,
    padding: '0.125rem 0',
    color: colors.neutrals[200],

    '& > *': {
      fontSize: size === 'large' ? '1.5rem' : '1rem',
    },

    '&:hover': {
      color: colors.primary[500],
    },

    ...(disabled && {
      color: colors.neutrals[200],

      '&:hover': {
        color: colors.neutrals[200],
      },
    }),
  })

  const singleValue: Configs['singleValue'] = (prevStyles) => ({
    ...prevStyles,
    color: colors.neutrals[700],
  })

  const placeholder: Configs['placeholder'] = (prevStyles) => ({
    ...prevStyles,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  })

  const container: Configs['container'] = (prevStyles) => ({
    ...prevStyles,
    width: '100%',
    fontFamily: typography.name,

    fontSize: size === 'large' ? '1rem' : '0.75rem',
    marginTop: 0,
    userSelect: 'none',

    position: 'relative',

    ...(showMenu && {
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        top: '50%',
        backgroundColor: colors.neutrals.white,
      },
    }),
  })

  return {
    control,
    menu,
    menuList,
    option,
    dropdownIndicator,
    singleValue,
    placeholder,
    container,
    clearIndicator,
  }
}
