import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors, typography } = theme

export const NodeLocalStyles = css`
  .node {
    all: unset;
    padding: 0.5rem;
    border-radius: 1rem;
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .node:hover {
    background-color: ${colors.neutrals[50]};
  }

  .icon-container {
    width: 1.5rem;
    aspect-ratio: 1/1;
    display: grid;
    place-items: center;
  }

  .label {
    all: unset;
    width: 100%;
    font-size: 0.75rem;
    font-weight: ${typography.weight.semibold};
    color: ${colors.neutrals[600]};
  }
`
