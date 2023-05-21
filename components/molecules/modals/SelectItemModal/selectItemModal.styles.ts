import css from 'styled-jsx/css'

export const SelectItemModalLocalStyles = css`
  .main-container {
    display: flex;
    width: 100%;
    height: 48vh;
    overflow-y: auto;
    width: 54rem;

    flex-direction: column;
    gap: 1rem;
  }

  .search-results {
    display: flex;
    flex: 1;
  }

  .categories,
  .subcategories,
  .items {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .categories {
    gap: 1rem;
  }

  .subcategories {
    gap: 0.5rem;
  }

  .items {
    gap: 0.25rem;
    padding-top: 0.5rem;
  }

  .subcategory {
    padding-top: 0.25rem;
  }
`
