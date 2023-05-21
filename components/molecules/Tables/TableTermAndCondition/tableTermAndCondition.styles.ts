import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme
export const TableTermAndConditionStyle = css.global`
  .tb-desktop-tableData {
    border: none;
  }

  .tb-desktop-tableData > div:nth-child(3) > div {
    border-top: none;
  }

  .tb-desktop-tableData > div:nth-child(2) > div {
    background-color: ${colors.neutrals[100]};
    border-radius: 1rem 1rem 0 0;
    color: ${colors.neutrals[500]};
  }

  .tb-desktop-avatar-icon {
    width: 2rem;
    height: 2rem;
  }

  .tb-desktop-avatar-img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .tb-desktop-btn {
    padding-right: 0.5rem;
    cursor: pointer;
  }

  .tb-desktop-btn__option {
    all: unset;
    padding: 0.5rem;
    border-radius: 100%;
    position: relative;
    padding-bottom: 0.3rem;
  }
  .tb-desktop-btn__option:hover {
    background-color: ${colors.neutrals[100]};
    cursor: pointer;
  }
  .tb-desktop-chip {
    text-transform: capitalize;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
  }
  .tb-desktop-invitado {
    background-color: ${colors.neutrals[50]};
    color: ${colors.neutrals[400]};
  }
  .tb-desktop-register {
    background-color: ${colors.semantic.success};
    color: ${colors.semantic.success};
  }
  .tb-desktop-sub-title {
    margin-top: 0.75rem;
  }

  .tb-desktop-icons-user {
    color: ${colors.neutrals[100]};
  }
  .tb-desktop-icon-not-found {
    height: 2rem;
    width: 2rem;
    color: ${colors.semantic.warning};
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
  .tb-desktop-menu-btn > div {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
    border-radius: 1rem;
    padding: 0.125rem 0.5rem;
    color: ${colors.semantic.danger};
  }
  .editClient_table {
    color: ${colors.primary[500]};
  }
  .deleteClient_table {
    color: ${colors.semantic.danger};
  }
  .avatar__textIcon {
    padding-left: 1rem;
  }
`
