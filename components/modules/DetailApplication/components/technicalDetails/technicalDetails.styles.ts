import css from 'styled-jsx/css'

export const TechnicalDetailsStyles = css`
  .metadata {
    width: 55rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    height: min-content;
  }

  .metadata > * {
    align-items: center;
  }

  .metadata :global(:is(.appstore-link, .android-package-name)) {
    grid-column: 1/3;
  }
`
