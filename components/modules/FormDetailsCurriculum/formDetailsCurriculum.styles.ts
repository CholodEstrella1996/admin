import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const FormDetailCurriculumLocalStyles = css`
  .formDetail__container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .formDetail__container :global(.headerButton__edit) {
    float: right;
    margin-top: 0.5rem;
  }
  .formDetail__container :global(.headerLabel__title) {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 1.15rem;
    background-color: ${colors.neutrals.white};
  }
`

export const FormDetailCurriculumGlobalStyles = css.global`
  .card__content--down {
    width: 100%;
  }
`
