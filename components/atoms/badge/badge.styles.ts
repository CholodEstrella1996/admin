import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const BadgeStyles = css`
  .badge {
    background-color: var(--background-color);
    color: ${colors.neutrals.white};
    border-radius: 100px;
    padding: 1px 8px;
    cursor: pointer;
    text-align: center;
    width: fit-content;
    min-width: 3rem;
    max-width: 8rem;
  }
`
