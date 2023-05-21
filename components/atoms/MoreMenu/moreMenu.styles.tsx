import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const MoreMenuGlobalStyles = css.global`
  .menu__buttons ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .MuiIconButton-root {
    width: 2.75rem;
    height: 2.75rem;
  }
  .menu__buttons .MuiPaper-root {
    border-radius: 1rem;
    gap: 1rem;
    background-color: ${colors.neutrals.white};
    box-shadow: 0px 12rem 5rem rgba(0, 0, 0, 0.01), 0px 6.75rem 4rem rgba(0, 0, 0, 0.05),
      0px 3rem 3rem rgba(0, 0, 0, 0.09), 0px 0.75rem 1.5rem rgba(0, 0, 0, 0.1),
      0px 0px 2rem rgba(0, 0, 0, 0.1);
    padding: 0.125rem 0.5rem;
  }

  .action__buttons {
    display: flex;
    gap: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;
    border-radius: inherit;
    justify-content: start;
  }

  .delete__button > button.buttonComponent {
    color: ${colors.semantic.danger};
    border-color: ${colors.semantic.danger};
  }
  .delete__button > button.buttonComponent:hover {
    color: ${colors.semantic.danger};
    border-color: ${colors.semantic.danger};
  }
`
