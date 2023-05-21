import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors, typography } = theme

export const SelectStyles = css`
  .select__container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-family: var(--font-family);
    position: relative;
  }
  .select__container:hover {
    cursor: var(--cursor-hover);
  }

  label {
    padding-left: 1.5rem;
  }

  .select__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
  }

  .warning__msg {
    padding-left: 1.5rem;
  }

  .warning__icon {
    position: absolute;
    width: 1rem;

    top: 53%;
    right: 4.25rem;
    transform: translate(0, -52%);
    color: ${colors.semantic.danger};
    align-items: center;
  }
  .warning__icon svg {
    width: 1rem;
    height: 1rem;
  }

  sup {
    vertical-align: super;
    font-size: smaller;
  }
`

export const SelectGlobalStyles = css.global`
  .cl-select--small__control,
  .cl-select--medium__control,
  .cl-select--large__control {
    border-radius: 2rem;
    font-weight: ${typography.weight.regular};
    color: ${colors.neutrals[700]};
    background-color: ${colors.neutrals.white};
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .cl-select--small__control {
    padding: 0 0.5rem 0 0.75rem;
  }
  .cl-select--medium__control {
    padding: 0.375rem 0.5rem 0.375rem 1rem;
  }
  .cl-select--large__control {
    padding: 0.75rem 0.5rem 0.75rem 1rem;
  }

  .cl-select--small__menu,
  .cl-select--medium__menu,
  .cl-select--large__menu {
    font-size: 0.875rem;
    font-weight: var(--regular-weight);
    border-radius: 1rem;
    overflow: hidden;
    padding: 0;
    border: 1px solid ${colors.primary[500]};
  }

  .cl-select--small__menu-list {
    max-height: 12rem;
  }
  .cl-select--small__control:hover,
  .cl-select--medium__control:hover,
  .cl-select--large__control:hover {
    border-color: ${colors.primary[500]};
  }
  .cl-select--small__control--is-focused,
  .cl-select--medium__control--is-focused,
  .cl-select--large__control--is-focused {
    outline: none;
    box-shadow: none;
  }
  .cl-select--small__control:disabled,
  .cl-select--medium__control:disabled,
  .cl-select--large__control:disabled {
    background-color: ${colors.neutrals.white};
    border-color: ${colors.neutrals[300]};
  }

  .cl-select--small__placeholder,
  .cl-select--medium__placeholder,
  .cl-select--large__placeholder {
    font-size: 0.875rem;
    line-height: var(--input-default-line-height);
    font-family: var(--font-family);
    font-weight: var(--regular-weight);
    color: ${colors.neutrals[200]};
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cl-select--small__clear-indicator,
  .cl-select--medium__clear-indicator,
  .cl-select--large__clear-indicator {
    cursor: pointer;
  }
  .cl-select--small__single-value--is-disabled,
  .cl-select--medium__single-value--is-disabled,
  .cl-select--large__single-value--is-disabled {
    color: ${colors.neutrals[200]};
  }

  .cl-select--small__clear-indicator:hover,
  .cl-select--medium__clear-indicator:hover,
  .cl-select--large__clear-indicator:hover {
    color: ${colors.neutrals[700]};
  }

  .cl-select--small__multi-value {
    border-radius: 0.25rem;
  }
  .cl-select--small__multi-value__label,
  .cl-select--medium__multi-value__label,
  .cl-select--large__multi-value__label {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: inherit;
    font-size: 0.75rem;
  }

  .cl-select--small__multi-value__remove {
    background-color: inherit;
    cursor: pointer;
  }
`
