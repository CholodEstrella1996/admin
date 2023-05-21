import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const FormDetailsCurriculumGradeLocalStyles = css`
  .formDetailGrade__container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`

export const FormDetailsCurriculumGradeGlobalStyles = css.global`
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
  .card__content--down {
    width: 100%;
  }
`
