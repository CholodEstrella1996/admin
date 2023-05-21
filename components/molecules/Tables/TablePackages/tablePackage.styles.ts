import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const TablePackageStyle = css.global`
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
  .tb-desktop-tableData > div > div > div > div > div > div > div > span > svg {
    color: ${colors.primary[500]};
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
