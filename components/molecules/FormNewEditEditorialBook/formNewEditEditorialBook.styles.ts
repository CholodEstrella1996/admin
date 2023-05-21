import css from 'styled-jsx/css'

export const FormNewEditEditorialBookLocalStyles = css``

export const FormNewEditEditorialBookGlobalStyles = css.global`
  .formEditorialBook__container {
    display: flex;
    width: 60rem;
    height: 28rem;
    overflow-y: auto;
  }
  .formEditorialBook__content {
    display: flex;
    flex-direction: column;
    width: 60%;
    gap: 1rem;
    padding: 0 2rem 0 0;
  }

  .formEditorialBook__multiple-inputs {
    display: flex;
    gap: 1rem;
  }

  .formEditorialBook__multiple-inputs > * {
    width: 100%;
    flex: 1;
  }

  .formEditorialBook__visible {
    display: flex;
    flex-direction: column;
    width: 40%;
    gap: 1rem;
    padding: 0 0 0 1rem;
  }
`
