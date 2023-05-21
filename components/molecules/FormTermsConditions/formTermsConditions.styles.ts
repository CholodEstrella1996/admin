import css from 'styled-jsx/css'

const FormTermConditionStyles = css`
  .formTermCondition_container {
    display: flex;
    gap: 2rem;
    width: 64rem;
    height: 30rem;
    overflow-y: auto;
  }

  .tab__container,
  .tab__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: auto;
  }
  .tab__content {
    width: 33rem;
  }
`

export default FormTermConditionStyles
