import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme
const FormEditTopicStyles = css`
  .formTopic__container {
    display: flex;
    gap: 2rem;
    width: 58rem;
    max-height: 50vh;
    overflow-y: auto;
  }

  .tab__container,
  .detail__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: auto;
  }

  .attach__file {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    color: ${colors.semantic.danger};
  }

  .detail__container {
    width: 20rem;
  }

  .formTopic__content,
  .edit__name,
  .edit__description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`
export const FormEditTopicGlobalStyles = css.global`
  .edit__description {
    margin-top: 1rem;
  }
  .edit__label {
    margin-left: 1.75rem;
    padding-bottom: 0.5rem;
  }
`

export default FormEditTopicStyles
