import css from 'styled-jsx/css'

export const FormDetailsEditorialLocalStyles = css`
  .detailEditorial__container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`
export const FormDetailsEditorialGlobalStyles = css.global`
  .labelEditorial {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 1.15rem;
    background-color: var(--neutrals-white-color);
  }
  .headerButton {
    float: right;
    margin-top: 0.5rem;
  }
  .card__content--down {
    width: 100%;
  }
  .sections__container > hr:last-child {
    display: none;
  }
`
