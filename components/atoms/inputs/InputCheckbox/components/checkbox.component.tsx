import { useId } from 'react'

import theme from '@folcode/clabs.others.theme-provider'
import { Checkbox as MaterialCheckbox } from '@mui/material'

// Constants
const { colors } = theme

const icons = {
  unckeckedIcon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 1H17C18.1046 1 19 1.89543 19 3V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17V3C1 1.89543 1.89543 1 3 1Z"
        stroke="#3C50B5"
        strokeWidth="2"
      />
    </svg>
  ),

  checkedIcon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 3C0 1.34315 1.34315 0 3 0H17C18.6569 0 20 1.34315 20 3V17C20 18.6569 18.6569 20 17 20H3C1.34315 20 0 18.6569 0 17V3Z"
        fill="#3C50B5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0385 7.42926C12.3926 6.96204 13.0718 6.86049 13.5555 7.20244C14.0393 7.54439 14.1444 8.20035 13.7904 8.66757L10.4312 13.1005C10.0688 13.5787 9.36974 13.6323 8.93862 13.215L6.31701 10.677C5.89362 10.2671 5.89443 9.6033 6.31884 9.19438C6.74324 8.78546 7.43052 8.78625 7.85391 9.19614L9.49539 10.7853L12.0385 7.42926Z"
        fill="white"
      />
    </svg>
  ),

  indeterminate: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 3C0 1.34315 1.34315 0 3 0H17C18.6569 0 20 1.34315 20 3V17C20 18.6569 18.6569 20 17 20H3C1.34315 20 0 18.6569 0 17V3Z"
        fill="#3C50B5"
      />
      <path
        d="M6 10H14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

// Types
type CheckboxProps = {
  id?: string

  checked: boolean
  indeterminate?: boolean

  onChange: () => unknown
}

export const Checkbox = ({ id, checked, indeterminate, onChange }: CheckboxProps) => {
  const checkboxId = useId()

  return (
    <MaterialCheckbox
      id={id ?? checkboxId}
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
      sx={{
        '& .MuiTouchRipple-root': {
          color: colors.primary[500],
        },

        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
      icon={icons.unckeckedIcon}
      checkedIcon={icons.checkedIcon}
      indeterminateIcon={icons.indeterminate}
    />
  )
}
