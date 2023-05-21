import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const FormDetailsCustomerLocalStyles = css`
  .customer__container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: ${theme.colors.neutrals.white};
    padding: 1.5rem;
    box-shadow: 0rem 0.015625rem 0.0625rem rgba(0, 0, 0, 0.039),
      0rem 0.053125rem 0.1875rem rgba(0, 0, 0, 0.19);
    border-radius: 2rem;
  }
  .customer__container__titles {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .customer__grid {
    flex: none;
    order: 0;
    flex-grow: 1;
    gap: 1rem;
  }

  .customer__padding {
    padding-bottom: 1rem;
  }
  .customer__filters__padding {
    padding-bottom: 0.5rem;
    margin-left: 1rem;
  }

  .customer__button {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .customer_filters_content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background: #f5f5fb;
    border-radius: 1rem;
  }
  .filters__input,
  .filters__select__country,
  .filters__select__type {
    width: 33%;
  }
  .filters__button {
    padding-top: 1.5rem;
  }
  .customer__icons {
    padding-top: 0.1rem;
    padding-left: 0.6rem;
  }
`
