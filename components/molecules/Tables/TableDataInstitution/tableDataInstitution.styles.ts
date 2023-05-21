import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const TableDataDesktopStyle = css.global`
  .tableDataDesktop__container {
    border: none;
  }

  .tableDataDesktop__container .MuiDataGrid-main .MuiDataGrid-columnHeaders {
    background-color: ${theme.colors.neutrals[100]};
    border-radius: 1rem 1rem 0 0;
    color: ${theme.colors.neutrals[500]};
  }

  .MuiDataGrid-overlay {
    background-color: ${theme.colors.neutrals.white};
    pointer-events: none;
    display: flex;
    align-items: start;
    padding-top: 7rem;
    opacity: 0.9;
    pointer-events: none;
  }

  .tableDataDesktop__avatar__icon {
    width: 2rem;
    height: 2rem;
  }

  .tableDataDesktop__avatar__img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .tableDataDesktop--chip {
    text-transform: capitalize;
    padding: 0 0.5rem;
    border-radius: 1rem;
  }
  .tableDataDesktop--invitado {
    background-color: ${theme.colors.neutrals[50]};
    color: ${theme.colors.neutrals[500]};
  }
  .tableDataDesktop--register {
    background-color: ${theme.colors.semantic.success};
    color: ${theme.colors.neutrals.white};
  }
  .tableDataDesktop-sub-title {
    margin-top: 0.75rem;
  }

  .tableDataDesktop__icons--user {
    color: ${theme.colors.neutrals[100]};
  }
  .tableDataDesktop-icon-not-found {
    height: 2rem;
    width: 2rem;
    color: ${theme.colors.semantic.warning};
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }

  .menu__buttons .MuiPaper-root {
    border-radius: 1rem;
    gap: 1rem;
    box-shadow: 0 12rem 5rem rgba(0, 0, 0, 0.01), 0 6.75rem 4rem rgba(0, 0, 0, 0.05),
      0 3rem 3rem rgba(0, 0, 0, 0.09), 0 0.75rem 1.5rem rgba(0, 0, 0, 0.1),
      0 0 2rem rgba(0, 0, 0, 0.1);
    padding: 0.125rem 0.5rem;
  }

  .menu__buttons ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .table__header .MuiDataGrid-columnHeaderTitle {
    color: ${theme.colors.neutrals[800]};
    font-family: ${theme.typography.name};
    font-weight: ${theme.typography.weight.semibold};
  }

  .action__buttons {
    display: flex;
    gap: 1rem;
    width: 100%;
    border-radius: inherit;
    justify-content: start;
    border-radius: 100%;
  }

  .MuiDataGrid-row:hover {
    cursor: pointer;
  }

  .MuiDataGrid-root .MuiDataGrid-columnSeparator {
    visibility: hidden;
  }

  .MuiDataGrid-root .MuiDataGrid-menuIcon {
    visibility: visible;
    width: auto;
  }

  .MuiDataGrid-panel .MuiDataGrid-panelHeader {
    display: none;
  }
  .MuiDataGrid-panel .MuiDataGrid-paper {
    border: 3px solid ${theme.colors.primary[500]};
    border-radius: 1rem;
  }

  .MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within,
  .MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  .MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }

  .hide-header-name .MuiDataGrid-columnHeaderTitle {
    display: none;
  }

  .actions__menu .MuiDataGrid-columnHeaderTitleContainer {
    flex: 0.65;
  }
  .actions__menu button svg {
    font-size: 1.5rem;
  }
`
