import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const HeaderAdminLocalStyles = css`
  .headerAdmin__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem;
    background-color: ${theme.colors.neutrals.white};
    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.08));
  }

  .logo__icon {
    margin: 0.4rem;
  }

  .lineheader {
    width: 1.8rem;
    height: 0rem;
    border: 0.01rem solid ${theme.colors.primary[500]};
    transform: rotate(90deg);
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .icon__title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .avatar__title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .avatar {
    padding-right: 0.5rem;
    cursor: pointer;
  }

  .avatar__button {
    all: unset;
    padding: 0.5rem;
    border-radius: 100%;
  }
  .avatar__button:hover,
  .avatar__button--hover {
    background-color: ${theme.colors.neutrals[50]};
  }
`
