import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const FormDetailsCountryLocalStyles = css`
  .country__container {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  .country__container--titles {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .country__grid {
    flex: none;
    order: 0;
    flex-grow: 1;
  }

  .country__name {
    align-items: flex-start;
    padding: 0rem 0.5rem;
    width: 3rem;
    height: 1.6rem;
    background: ${theme.colors.neutrals.white};
    border-radius: 1.2rem;
  }

  .country__grid :global(.countryName__title) {
    color: ${theme.colors.neutrals[400]};
    display: flex;
    align-items: center;
    text-align: center;
    flex: none;
    order: 0;
    flex-grow: 0;
    font-weight: 600;
    font-size: 0.8rem;
    line-height: 1.5rem;
  }

  .country__grid :global(.countryName__subtitle) {
    color: ${theme.colors.primary[500]};
    display: flex;
    align-items: center;
    text-align: center;
    flex: none;
    order: 1;
    flex-grow: 0;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2rem;
    padding-top: 1rem;
  }

  .countryEdit__button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 0.6rem;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  :global(.card__content--down) {
    width: 100%;
  }
`
