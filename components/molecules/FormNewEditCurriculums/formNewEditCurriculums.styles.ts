import css from 'styled-jsx/css'

export const FormNewEditCurriculumsLocalStyles = css`
  .formCurriculums__container {
    display: flex;
    width: 45rem;
    height: 44vh;
    overflow-y: auto;
  }
  .formCurriculums__container--year {
    display: flex;
    width: 45rem;
    height: 56vh;
    overflow-y: auto;
  }
  .formCurriculums__information {
    display: flex;
    flex-direction: column;
    width: 65%;
    gap: 0.75rem;
    padding-right: 2rem;
  }
  .formCurriculums__store {
    display: flex;
    flex-direction: column;
    width: 35%;
    gap: 0.5rem;
    padding-left: 2rem;
  }
`

export const FormNewEditCurriculumsGlobalStyles = css.global`
  .formCurriculums__title {
    padding-bottom: 0.5rem;
  }
`
