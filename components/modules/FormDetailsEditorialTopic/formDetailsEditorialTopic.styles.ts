import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const FormDetailsEditorialTopicLocalStyles = css`
  .formDetail__container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`
export const FormDetailsEditorialTopicGlobalStyles = css.global`
  .headerButton {
    float: right;
    margin-top: 0.5rem;
  }
  .headerLabel {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 1.15rem;
    background-color: ${colors.neutrals.white};
  }
  .themeLabel {
    margin-top: 1rem;
  }
  .labsAssociate__container {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  .labsAssociate__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card__content--down {
    width: 100%;
  }
  .formDetail__container :globlal(.card-content--down) {
    width: 100%;
  }
`
