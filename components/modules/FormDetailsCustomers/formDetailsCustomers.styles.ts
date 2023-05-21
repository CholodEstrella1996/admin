import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const FormDetailCustomerLocalStyles = css`
  .subs__container {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
    width: 68%;
    background: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
  }
  .formDetail__container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .formDetail__container :global(.header_button__edit) {
    float: right;
    margin-top: 0.5rem;
  }
  .subscription__padding :global(.header_button__edit) {
    float: right;
    margin-top: 1.5rem;
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
  .formDetail__user__actions {
    background: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
    width: 30%;
    padding: 1rem;
    margin-top: 1.5rem;
    display: grid;
    gap: 0.5rem;
    float: right;
  }
  .formDetail__button__delete,
  .subs__button__actions {
    background: ${colors.neutrals.white};
    border: 2px solid ${colors.semantic.danger};
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
`

export const FormDetailCustomerGlobalStyles = css.global`
  .card__content--down {
    width: 100%;
  }
  .card__content--open {
    margin-left: 1rem;
  }
  .subs__container {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
    width: 68%;
    background: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
  }
  .subs__client {
    padding-inline: 1rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.08);
    border: none;
  }
  .subs__client__data {
    padding-top: 1rem;
  }

  .user__container {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
    width: 68%;
    background: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
  }
  .user__information {
    flex-direction: column;
    display: flex;
    padding: 2rem;
    gap: 1.5rem;
  }
  .user__section {
    display: flex;
    gap: 1.5rem;
  }
  .user__title__section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user__par__data,
  .user__address_par__data {
    display: flex;
    width: 33%;
    flex-direction: column;
    gap: 0.5rem;
  }

  .user__address_par__data {
    width: 70%;
  }
  .user__duo__data {
    width: 31%;
  }
  .user__par__title__data {
    flex-direction: column;
    display: flex;
    width: 100%;
    gap: 0.5rem;
  }
  .addres_data {
    gap: 0.5rem;
  }
  .last_data {
    gap: 2rem;
  }
  .subscription__padding {
    padding: 1rem;
    flex-direction: column;
  }
  .subscription__title {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
  }
  .selected__texts {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .selected__section {
    gap: 1rem;
    padding-bottom: 2rem;
  }
  .selected__details__customer {
    margin-bottom: 1rem;
    max-height: 19vh;
    width: 100%;
    overflow-y: auto;
  }

  .selected__badge {
    padding-inline: 0.5rem;
    background: ${colors.neutrals.white};
    border-radius: 6.25rem;
  }
  .selected__content {
    color: ${colors.neutrals[50]};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${colors.neutrals[50]};
    border-radius: 2rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .selected__details__customer :hover {
    background: ${colors.neutrals[100]};
  }
`
