import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const HeaderTitleStyles = css`
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }

  .header__buttons {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    flex-shrink: 0;
  }

  .header__back__arrow:hover {
    background-color: ${colors.neutrals[100]};
    cursor: pointer;
  }
  .header :global(.header__sub__title) {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    border-radius: 1.15rem;
    background-color: ${colors.neutrals.white};
    margin-left: 3rem;
  }
  .header__back__arrow {
    all: unset;
    float: left;
    border-radius: 100%;
    color: ${colors.primary[500]};
    margin-right: 0.6rem;
    padding: 0.3rem 0.2rem 0 0.2rem;
  }
  .header :global(.header__title) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 3rem;
    margin-top: 1rem;
  }
  .header {
    padding: 2rem 0 2rem;
  }
`
