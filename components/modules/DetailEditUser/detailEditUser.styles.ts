import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme
export const DetailEditUserLocalStyles = css`
  .navigationAndButtons__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
  }

  .userInfo__container {
    display: grid;
    background-color: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 1.5rem;
    gap: 1rem;
  }

  .user__avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    gap: 1rem;
  }

  .usernameAndAvatar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem 0.75rem;
  }

  .user__information,
  .usernames {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.75rem;
  }
  .user_suscription {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background-color: ${colors.neutrals[50]};
    width: 18rem;
    height: 6rem;
    border-radius: 1rem;
  }
  .button__container {
    display: flex;
    padding: 2rem 0;
    justify-content: center;
  }
  .subs__button__actions {
    background: ${colors.neutrals.white};
    border: 0.125rem solid ${colors.primary[500]};
    border-radius: 6.25rem;
    border-color: ${colors.primary[500]};
    color: ${colors.primary[500]};
    width: 100%;
    justify-content: center;
    cursor: pointer;
  }

  .usernames {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .navigationAndButtons__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .titleAndButtons__container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .action__buttons {
    display: flex;
  }

  .userInfo__container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 1.5rem;
  }

  .user__avatar {
    align-items: center;
  }

  .usernameAndAvatar {
    flex-direction: column;
  }

  .user__avatar--text {
    padding-top: 1.25rem;
    text-align: center;
  }

  .user__information {
    grid-column: span 2 / span 2;
  }
`

export const DetailEditUserGlobalStyles = css.global`
  .personIcon {
    color: ${colors.neutrals[100]};
    border-color: ${colors.neutrals[100]};
    border-radius: 100%;
  }

  .avatar__image,
  .avatar__image .avatar__icon.avatar--medium {
    width: 100%;
    height: 100%;
  }

  .avatar__image img.avatar--medium {
    width: 100%;
    height: 100%;
  }

  .avatar__icon svg {
    width: 100%;
    height: 100%;
  }

  .user__role {
    text-transform: capitalize;
  }

  .id__data {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
  }
  .input__identityNumber {
    grid-column: auto;
  }
  .extra__data {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
  }

  .profile__chip {
    margin-top: 0.25rem;
    width: 100%;
    background: var(--chip-background-color);
  }
  .profile__chip--color {
    color: var(--chip-font-color);
  }

  .user__avatar--label {
    padding-left: 1.5rem;
  }

  .profile__chip {
    width: fit-content;
  }

  .avatar__image,
  .avatar__image .avatar__icon.avatar--large {
    width: 12rem;
    height: 12rem;
  }

  .avatar__image img.avatar--large {
    width: 100%;
    height: 100%;
  }

  .id__data {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
  .input__identityNumber {
    grid-column: span 2 / span 2;
  }
  .extra__data {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
  .input_date {
    display: flex;

    width: 20rem;
  }
  .avatar__image {
    margin-right: 0;
  }
  .overview-products {
    width: 100%;
    background-color: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgb(0 0 0 / 8%);
    border-radius: 1rem;
    padding: 1rem;
  }
  .overview-container {
    display: flex;
    flex-direction: column;
    width: 55rem;
    gap: 1rem;
    max-height: 55vh;
  }

  .content-customer {
    width: 100%;
    background-color: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgb(0 0 0 / 8%);
    border-radius: 1rem;
    padding: 1rem;
  }
`
