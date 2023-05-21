import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const InputDateLocalStyles = css.global`
  .MuiInputBase-root-MuiOutlinedInput-root {
    justify-content: center;
    border: ${colors.neutrals[300]} 0.125rem solid;
    border-radius: 2rem;
    height: 3.29rem;
  }
  .MuiInputBase-root-MuiOutlinedInput-root:hover {
    border: ${colors.primary[500]} 0.125rem solid;
  }
  .MuiButtonBase-root-MuiIconButton-root {
    color: ${colors.primary[500]};
  }
  .MuiOutlinedInput-notchedOutline {
    border-style: none;
  }
`
