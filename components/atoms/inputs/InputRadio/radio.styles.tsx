import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const RadioStyles = css`
  .radio__container {
    display: flex;
    position: relative;
    padding: 0 0.4rem;
    margin: 1.5rem 0;
  }

  .radio__container .radio__input {
    display: none;
    cursor: pointer;
  }
  .radio__container .radio__label {
    display: flex;
    align-items: center;
  }

  .radio__container .radio__label:before {
    content: ' ';
    display: inline-block;
    position: relative;
    top: 0px;
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    background-color: transparent;
    border: 2px solid ${theme.colors.neutrals[300]};
    cursor: pointer;
  }
  .radio__container .radio__input:checked + .radio__label:before {
    border: 2px solid ${theme.colors.primary[500]};
    cursor: pointer;
  }

  .radio__container .radio__input:checked + .radio__label:after {
    border-radius: 1.25rem;
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 0.35rem;
    left: 0.75rem;
    content: ' ';
    display: block;
    background-color: ${theme.colors.primary[500]};
    cursor: pointer;
  }
`
