import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const fileListLocalStyles = css`
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .file {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .file :global(button > div:first-child) {
    display: var(--display);
  }

  .caption {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .file :global(.delete-icon) {
    display: flex;
    height: 1.5rem;
    color: ${colors.semantic.danger};
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background) no-repeat center center;
    background-size: cover;
    border-radius: 3rem;
    height: 1.5rem;
    width: 1.5rem;
    overflow: hidden;
  }
`
