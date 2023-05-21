import css from 'styled-jsx/css'

export const DetailsMaterialStyle = css`
  .detailsMaterial__container {
    display: flex;
    flex-direction: row;
    border-radius: 32px;
    gap: 1rem;
    width: 45rem;
  }

  .tab__container {
    flex: 1;
  }

  .divider {
    width: 1px;
    min-height: 150px;
    background-color: rgba(0, 0, 0, 0.12);
  }

  .material__container {
    flex-shrink: 0;
    width: 15rem;
  }

  .detail__title {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  .materials {
    padding-top: 1rem;
  }
`
