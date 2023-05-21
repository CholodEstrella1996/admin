import css from 'styled-jsx/css'

export const DetailAppLocalStyles = css`
  .detailApp__container,
  .technical__section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .detailApp__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
  }
`

export const DetailAppGlobalStyles = css.global`
  .card__content--down {
    width: 100%;
  }

  .headerLabel {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    border-radius: 1.15rem;
    background-color: var(--neutrals-white-color);
  }
  .editMaterial__container {
    height: 46vh;
    overflow: auto;
  }

  .learning__item {
    display: flex;
    justify-content: space-between;
  }

  .technicalApp__container {
    display: grid;
    grid-template-columns: 2fr 0.2fr 2.5fr;
    gap: 1rem;
  }

  .technicalApp__executable,
  .technicalApp__information,
  .learning__units,
  .technical__section {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }

  .app__version {
    display: flex;
    justify-content: space-between;
  }

  .technical__section {
    gap: 0.5rem;
  }
  .technical__button {
    display: flex;
    align-items: end;
  }
`
