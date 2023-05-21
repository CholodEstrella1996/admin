import css from 'styled-jsx/css'

export const AdminLayoutLocalStyles = css`
  .container {
    display: grid;

    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr;

    grid-template-areas:
      'Header Header'
      'Sidebar Content';

    height: 100vh;
    width: 100%;

    scroll-behavior: smooth;
  }

  .sidebar,
  .content,
  .header {
    min-height: 0;
    height: 100%;
  }

  .header {
    grid-area: Header;
    z-index: 1;
  }

  .sidebar {
    grid-area: Sidebar;
    display: flex;
  }

  .content {
    padding: 1.5rem 3rem;
    grid-area: Content;
    overflow-y: auto;
    background-color: #fafafb;
  }
`

export const AdminLayoutGlobalStyles = css.global`
  body {
    overscroll-behavior: none;
  }
`
