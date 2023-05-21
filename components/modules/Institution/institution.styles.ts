import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const InstitutionStyles = css`
  .header__back__arrow {
    all: unset;
    border-radius: 100%;
    color: ${colors.primary[500]};
    padding: 0.3rem 0.2rem 0 0.2rem;
    margin-top: 1rem;
  }
  .header__back__arrow:hover {
    background-color: ${colors.neutrals[100]};
    cursor: pointer;
  }
  .header_label__title {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    border-radius: 1.15rem;
    background-color: ${colors.neutrals.white};
    margin-left: 3rem;
  }
  .section__headers :global(.headerLabel__sub__title) {
    margin-top: -2.5rem;
    margin-bottom: 1rem;
    padding-left: 3rem;
  }

  .section__headers :global(.header_label__title) {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    border-radius: 1.15rem;
    background-color: ${colors.neutrals.white};
    margin-left: 3rem;
    margin-bottom: -1rem;
  }
`

export const InstitutionGlobalStyles = css.global`
  .tab__items {
    font-size: 1rem;
    text-transform: capitalize;
    color: ${colors.neutrals[400]};
  }
`
