import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const TabContentStyles = css`
  .tabPanel__card {
    background: ${colors.neutrals.white};
    padding: 1rem;
    width: 100%;
    margin: 0;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .tabPanel__card__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }

  .tabPanel__card__body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .tabPanel__card__filter {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    background: ${colors.neutrals[50]};
    padding: 1rem;
    border-radius: 1rem;
    align-items: initial;
  }

  .tabPanel__card__table {
    height: auto;
  }

  .button__container {
    display: flex;
    justify-content: center;
  }
  .subscription_filters_content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background: ${colors.neutrals[50]};
    border-radius: 1rem;
  }
`

export const TabContentGlobalStyles = css.global`
  .input {
    flex: 1;
    font-size: 1rem;
    font-weight: 500;
  }
  .tabContent__buttons {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .tabPanel__title {
    padding-bottom: 0.5rem;
  }
`
