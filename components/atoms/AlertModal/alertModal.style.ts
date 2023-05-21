import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const AlertStyle = css.global`
  .alert-container-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  .alert-btn-cancel {
    color: ${theme.colors.neutrals[400]};
  }
  .alert-btn-delete {
    color: ${theme.colors.semantic.danger};
  }
  .alert-sub-title {
    margin-top: 1rem;
  }
`
