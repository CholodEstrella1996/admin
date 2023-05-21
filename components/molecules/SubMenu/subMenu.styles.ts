import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const SubMenuLocalStyles = css`
  .container {
    display: flex;
    flex-direction: column;
    width: clamp(12rem, 22vw, 15rem);
    padding: 1rem;

    background-color: ${colors.neutrals[50]};
  }

  .container > :global(.items) {
    padding-left: 0;
  }
`
