import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const SelectedProductsStyles = css`
  .selected__content {
    color: ${colors.neutrals[50]};
    display: flex;
    justify-content: space-between;
    background: ${colors.neutrals[50]};
    border-radius: 2rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }

  .selected__details {
    padding-top: 0.4rem;
    margin-bottom: 1rem;
    max-height: 38vh;
    width: 100%;
    overflow-y: auto;
  }

  .selected__section {
    gap: 1rem;
    padding-bottom: 2rem;
  }

  .selected__badge {
    padding-inline: 0.5rem;
    background: ${colors.neutrals.white};
    border-radius: 6.25rem;
  }

  .selected__content {
    color: ${colors.neutrals[50]};
    display: flex;
    justify-content: space-between;
    background: ${colors.neutrals[50]};
    border-radius: 2rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
`
