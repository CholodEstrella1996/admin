import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const DetailsPackageStyles = css`
  .detailPackage__container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .backArrow {
    all: unset;
    float: left;
    border-radius: 100%;
    color: ${colors.primary[500]};
    margin-right: 0.5rem;
    margin-top: 1rem;
    padding-left: 0.3rem;
    cursor: pointer;
  }
  .selected-products {
    background-color: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgb(0 0 0 / 8%);
    border-radius: 1rem;
    padding: 1rem;
    height: 100%;
    gap: 1rem;
    display: grid;
  }
`

export const DetailsPackageGlobalStyles = css.global`
  .card__content--down {
    width: 100%;
  }

  .headerLabel {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 2.9rem;
    border-radius: 1.15rem;
    background-color: var(--neutrals-white-color);
  }

  .headerButton {
    float: right;
    margin-top: 1.5rem;
  }
`
