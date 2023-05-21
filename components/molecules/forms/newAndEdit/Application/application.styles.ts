import css from 'styled-jsx/css'

export const ApplicationStep1Styles = css`
  .step1 {
    display: flex;
    width: 58rem;
    height: 50vh;
    overflow-y: auto;
  }

  .general {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 60%;
    gap: 0.5rem;
  }

  .main-info {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .main-info :global(:is(.application-type, .classroom-code)) {
    width: 100%;
  }
`
