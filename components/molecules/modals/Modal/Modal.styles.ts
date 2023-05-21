import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const ModalLocalStyles = css`
  .container {
    display: flex;
    flex-direction: column;
    border-radius: 1.5rem;

    height: 100%;
    padding: 1.5rem;
    gap: 1.5rem;
    background-color: ${colors.neutrals[50]};
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .close-button {
    display: flex;
    color: ${colors.primary[500]};
    margin-top: 0.25rem;
    cursor: pointer;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .main {
    display: flex;
    flex-direction: column;

    background-color: var(--content-color, ${colors.neutrals.white});
    border-radius: 1.5rem;
    max-width: 70rem;

    padding: var(--content-padding, 1rem);
    gap: 1rem;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`
