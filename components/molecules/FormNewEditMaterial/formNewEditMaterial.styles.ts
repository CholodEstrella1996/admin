import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme
const FormEditMaterialStyles = css.global`
  .edit__material__container {
    display: flex;
    flex-direction: row;
    width: 58rem;
    height: 60vh;
    overflow-y: auto;
    gap: 2rem;
  }

  .tab__container {
    display: flex;
    flex-direction: column;
    flex: auto;
  }
  .detail__container {
    display: flex;
    flex-direction: column;
    width: 20rem;
    gap: 1rem;
  }

  .attach__file {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    color: ${colors.semantic.danger};
  }

  .tabEdit__content,
  .edit__name,
  .edit__description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .edit__name,
  .edit__description {
    margin-top: 1rem;
  }
  .edit__label {
    margin-left: 1.75rem;
  }

  .edit__label--no-margin {
    padding-bottom: 0.5rem;
  }
`
export default FormEditMaterialStyles
