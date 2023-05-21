import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const InputChipLocalStyles = css`
  .container {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    flex-direction: column;
  }

  .label {
    white-space: nowrap;
    padding-left: 1.5rem;
  }

  .input-chip {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
  }

  .input-chip :global(.textField > div) {
    padding: 0.25rem 1rem;
  }
  .input-chip :global(.textField > div > fieldset) {
    border: none;
  }

  .input-chip :global(.counter) {
    position: absolute;
    right: 2rem;
    color: ${colors.neutrals[300]};
  }
`
