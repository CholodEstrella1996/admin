import css from 'styled-jsx/css'

export const ProgressBarLocalStyles = css``

export const ProgressBarGlobalStyles = css.global`
  .progress__section {
    width: 100%;
    padding: 1rem;
  }
  .progress__container {
    justify-content: space-between;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
  }
  .progress-user-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .progress-user-inputs {
    display: flex;

    gap: 2rem;
  }
  .progress__installs {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .progress__installs__badge {
    margin-top: 0.5rem;
  }

  .selected__texts {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
`
