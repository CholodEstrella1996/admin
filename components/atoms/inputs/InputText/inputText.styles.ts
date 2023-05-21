import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors, typography } = theme

export const InputTextLocalStyles = css`
  /* Input Container */
  .container {
    display: flex;
    position: relative;

    gap: 0.5rem;
    padding: 0.5rem 1rem 0.5rem 1.5rem;
    width: 100%;

    background-color: ${colors.neutrals.white};
    border: var(--error-color, ${colors.neutrals[300]}) 2px solid;
    align-items: center;
  }

  /* Versions */
  .container--default {
    border-radius: 6rem;
  }

  .container--multiline {
    border-radius: 2rem;
    align-items: flex-end;
  }

  /* States */
  .container:hover {
    border-color: var(--error-color, ${colors.primary[500]});
  }

  .container:focus-within {
    outline-color: var(--error-color, ${colors.primary[500]});
  }

  .container:focus::placeholder {
    color: ${colors.neutrals[400]};
  }

  .container:disabled {
    border-color: ${colors.neutrals[200]};
  }

  .container:disabled::placeholder {
    color: ${colors.neutrals[200]};
  }

  .container ::placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Icon error */
  .error-icon {
    display: flex;
    align-items: center;
    align-self: center;
    color: ${colors.semantic.danger};
  }

  /* input */
  .input {
    border: none transparent;
    outline: none;
    padding: 0;

    font-family: ${typography.name};
    font-weight: ${typography.weight.semibold};
    color: ${colors.neutrals[700]};
    resize: none;

    padding-top: 0.55rem !important; /* fix in spacings */
  }

  .input::placeholder {
    color: ${colors.neutrals[200]};
  }

  .input ::placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .input--small {
    padding-top: 0 !important;
  }

  .input--small,
  .input--medium {
    width: calc(100% - var(--input-default));
  }

  .input--small,
  .input--medium {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .input--medium {
    padding: 0.5rem 0;
  }

  .input--large {
    width: calc(100% - var(--input-large));
    padding-block: 0.75rem !important;
    font-size: 1rem;
    line-height: 1.25rem;
  }

  /* Main icon */
  .icon {
    color: var(--icon-color);
    display: var(--show-icon);
  }

  .icon--large {
    font-size: 1.5rem;
  }

  /* Character counter */
  .character-counter {
    color: var(--character-counter-color);
    margin-right: 0.25rem;
  }

  /* Clear icon */
  .clear-icon {
    color: ${colors.neutrals[200]};
  }

  .clear-icon:hover {
    color: ${colors.primary[500]};
    cursor: pointer;
  }
`
