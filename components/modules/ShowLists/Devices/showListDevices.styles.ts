import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const ShowlistDevicesLocalStyles = css`
  .header-text {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: ${theme.colors.neutrals.white};
    padding: 1.5rem;
    box-shadow: 0rem 0.015625rem 0.0625rem rgba(0, 0, 0, 0.039),
      0rem 0.053125rem 0.1875rem rgba(0, 0, 0, 0.19);
    border-radius: 2rem;
  }
  .devices-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: start;
    gap: 2rem;
    padding: 0.5rem;
    padding-bottom: 2rem;
  }
  .header-title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .devices-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: ${theme.colors.neutrals.white};
    padding: 1.5rem;
    box-shadow: 0 0.015625rem 0.0625rem rgba(0, 0, 0, 0.039),
      0 0.053125rem 0.1875rem rgba(0, 0, 0, 0.19);
    border-radius: 2rem;
  }
  .container-titles {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .devices-grid {
    flex: none;
    order: 0;
    flex-grow: 1;
    gap: 1rem;
  }

  .devices-padding {
    padding-bottom: 1rem;
  }
  .filters-padding {
    padding-bottom: 0.5rem;
    margin-left: 1rem;
  }

  .filters-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background: #f5f5fb;
    border-radius: 1rem;
  }
  .filters-input,
  .filters-select {
    width: 50%;
  }
  .filters-button {
    padding-top: 1.5rem;
  }
  .devices-icons {
    padding-top: 0.1rem;
    padding-left: 0.6rem;
  }
  .icon-back {
    all: unset;
    float: left;
    border-radius: 100%;
    color: ${theme.colors.primary[500]};
    margin-right: 0.4rem;
    padding: 0.3rem 0.2rem 0 0.2rem;
  }
  .filters-button :global(.buttonComponent) {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-inline: 1.2rem;
    width: 5rem;
    height: 3.25rem;
  }
`
