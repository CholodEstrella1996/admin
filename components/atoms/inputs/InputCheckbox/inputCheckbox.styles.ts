import css from 'styled-jsx/css'

export const inputCheckboxLocalStyles = css`
  .container {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    flex-direction: column;
  }

  .label {
    white-space: nowrap;
  }

  .checkbox {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox :global(.title) {
    flex: 1;
  }

  .checkbox--right {
    flex-direction: row-reverse;
  }

  .checkbox--with-left-spacing {
    padding-left: 1rem;
  }
`
