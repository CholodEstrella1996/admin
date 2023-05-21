import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const errorFallbackLocalStyles = css`
  .error-fallback__container {
    display: inline-block;
    width: 100%;
    padding: 12rem;
  }

  .error-fallback__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    text-align: center;
  }

  .error-fallback__icon {
    display: flex;
    justify-content: center;
    font-size: 8rem;
    color: ${theme.colors.semantic.danger};
  }

  .error-fallback__caption {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .error-fallback-button {
    display: flex;
    padding-top: 2rem;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
  }
`
