import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const inputFileLocalStyles = css`
  .input-file {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .with-left-spacing {
    padding-left: 1.5rem;
  }

  .add-file-button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }

  .button {
    display: flex;
    align-items: center;
    border: 0.125rem solid;
    border-radius: 6.25rem;
    border-color: ${colors.primary[500]};
    color: ${colors.primary[500]};
    background: transparent;
    cursor: pointer;
  }

  .button:hover {
    border-color: ${colors.primary[800]};
    color: ${colors.primary[800]};
  }

  .input {
    display: none;
  }

  .button > :global(.button--small) {
    display: flex;
    align-items: center;
    height: 1.5rem;
    padding: 0rem 1rem;
  }

  .button > :global(.button--medium) {
    display: flex;
    align-items: center;
    height: 2rem;
    padding: 0.375rem 1.5rem;
  }
  .button > :global(.button--large) {
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding: 0.625rem 1.875rem;
  }
`
