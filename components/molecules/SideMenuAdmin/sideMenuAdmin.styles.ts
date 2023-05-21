import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const SideMenuAdminLocalStyles = css`
  .adminList__container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: clamp(12rem, 25vw, 17rem);
    padding: 1.25rem 1.5rem 2rem 1.25rem;
    color: ${theme.colors.neutrals[300]};
    background-color: ${theme.colors.neutrals.white};
    filter: drop-shadow(0 0 1rem rgba(0, 0, 0, 0.08));
    overflow-y: auto;
    height: 100%;
    min-height: 0;
  }

  .adminList__sections,
  .adminList__pages {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .adminList__item {
    all: unset;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    border-radius: 0.5rem;
  }

  .adminList__item:hover {
    opacity: 1;
    color: ${theme.colors.neutrals[500]};
    background-color: ${theme.colors.neutrals[50]};
    cursor: pointer;
  }

  .adminList__item--selected {
    color: ${theme.colors.neutrals[500]};
    background-color: ${theme.colors.neutrals[50]};
  }
`
