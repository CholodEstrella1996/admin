import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const FormDetailSubscriptionLocalStyles = css`
  .formDetail__container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .formDetail__container :global(.header_button__edit) {
    float: right;
    margin-top: 0.5rem;
  }

  .formDetail__customer__back__arrow:hover {
    background-color: ${colors.neutrals[100]};
    cursor: pointer;
  }
  .formDetail__container :global(.header_label__title) {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    border-radius: 1.15rem;
    background-color: ${colors.neutrals.white};
    margin-left: 3rem;
  }
  .formDetail__container :global(.headerLabel__sub__title) {
    margin-top: 0.5rem;
    margin-left: 3rem;
  }
  .formDetail__customer__back__arrow {
    all: unset;
    float: left;
    border-radius: 100%;
    color: ${colors.primary[500]};
    margin-right: 0.4rem;
    padding: 0.3rem 0.2rem 0 0.2rem;
  }
  .formDetail__subs__actions {
    background: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
    width: 25%;
    padding: 1rem;
    margin-top: 1.5rem;
    display: grid;
    gap: 0.5rem;
    float: right;
  }
  .formDetail__button__delete,
  .subs__button__actions {
    background: ${colors.neutrals.white};
    border: 0.125rem solid ${colors.semantic.danger};
    border-radius: 6.25rem;
    border-color: ${colors.semantic.danger};
    color: ${colors.semantic.danger};
    width: 100%;
    justify-content: center;
    cursor: pointer;
  }
  .subs__button__actions {
    background: ${colors.neutrals.white};
    border: 0.125rem solid ${colors.primary[500]};
  }
  .subs__button__actions:hover {
    border: 0.2rem solid ${colors.primary[700]};
  }
  .formDetail__button__delete:hover {
    border: 0.2rem solid ${colors.semantic.danger};
  }
  .subs__container {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
    width: 73%;
    background: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
  }

  .local__subs__information {
    flex-direction: column;
    display: flex;
    padding-bottom: 1rem;
    gap: 1rem;
  }
  .progress__input {
    padding-top: 1rem;

    min-width: 38%;
  }
  .progress__input-lms {
    padding-top: 1rem;

    min-width: 28%;
  }
  .progress__input-token {
    padding-top: 1rem;

    min-width: 15%;
  }
  .subs_product_button {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
`

export const FormDetailSubscriptionGlobalStyles = css.global`
  .card__content--down {
    width: 100%;
  }

  .subs__container {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
    width: 68%;
    background: ${colors.neutrals.white};
    border-radius: 2rem;
  }

  .subs__client {
    padding-inline: 1rem;
    box-shadow: 0px 0.25rem 0.5rem rgba(0, 0, 0, 0.08) !important;
    border: none;
  }
  .subs__client__data {
    padding-top: 1rem;
  }

  .subs__information {
    flex-direction: column;
    display: flex;
    padding-block: 1rem;
    gap: 1rem;
    width: 100%;
  }

  .subs__section {
    display: flex;
    gap: 1.5rem;
  }
  .subs__title__section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .subs__par__data,
  .subs__par__data__large,
  .subs__par__data__small {
    display: flex;
    width: 31%;
    flex-direction: column;
    gap: 0.5rem;
  }

  .subs__par__title__data {
    flex-direction: column;
    display: flex;
    width: 100%;
    gap: 0.5rem;
  }
  .subs__par__data__large {
    width: 65%;
  }
  .subs__par__data__small {
    width: 23%;
  }
  .subs__par__data__access {
    width: 100%;
  }

  .subs__container :global(.card__container) {
    border-radius: 1.5rem;
  }
  .progress__section {
    width: 100%;
    padding: 1rem;
  }
  .progress__container {
    justify-content: space-between;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
  }
  .progress-user-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .progress-user-inputs {
    display: flex;

    gap: 2rem;
  }
  .progress__installs {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .progress__installs__badge {
    margin-top: 0.5rem;
  }

  .selected__texts {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .subscription__container__titles {
    padding: 1.5rem 0 1rem 0.5rem;
  }
  .subscription__space__titles {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`
