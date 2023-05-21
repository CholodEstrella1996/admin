import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const TextIconLocalStyles = css`
  .container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 16rem;
    padding: 0.5rem;
  }

  .container:hover {
    background-color: ${colors.neutrals[50]};
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  .caption {
    display: flex;
    align-items: center;
  }

  .container :global(.check-icon) {
    margin: 0 0.5rem;
  }

  .button--small {
    height: 1.5rem;
  }
  .button--medium {
    height: 3rem;
  }
  .button--large {
    height: 6rem;
  }
  .container :global(.text--small) {
    margin: 0.75rem;
  }
  .container :global(.text--medium) {
    text-align: initial;
    margin: 0.75rem;
  }
  .container :global(.text--large) {
    text-align: initial;
    margin: 1rem;
  }
`
