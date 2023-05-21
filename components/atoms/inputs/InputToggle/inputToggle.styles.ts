import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

const checkedIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iaW5oZXJpdCI+PGcgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBkYXRhLW5hbWU9ImNoZWNrbWFyayI+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBvcGFjaXR5PSIwIj48L3JlY3Q+PHBhdGggZD0iTTkuODYgMThhMSAxIDAgMCAxLS43My0uMzJsLTQuODYtNS4xN2ExIDEgMCAxIDEgMS40Ni0xLjM3bDQuMTIgNC4zOSA4LjQxLTkuMmExIDEgMCAxIDEgMS40OCAxLjM0bC05LjE0IDEwYTEgMSAwIDAgMS0uNzMuMzN6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4='

export const inputToggleLocalStyles = css`
  .container {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    flex-direction: column;
  }

  .label {
    white-space: nowrap;
  }

  .input-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .input-container :global(.title) {
    flex: 1;
  }
  .input-container :global(.title-right) {
    flex: 1;
    padding-left: 1rem;
  }

  /*** Toogle Checkbox Start ***/
  .input {
    position: relative;
    -webkit-appearance: none;
    outline: none;
    width: 3.3rem;
    height: 2rem;
    border: 0;
    border-radius: 3rem;
    transition: all 1s;
    background-color: var(--unchecked-color);
    margin-left: 1rem;
  }

  .input:hover {
    background-color: var(--unchecked-hover-color);
    cursor: pointer;
  }

  .input::before {
    content: '';
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    border: 0;
    left: 0;
    top: 50%;
    transform: translateY(-50%) scale(1);
    border-radius: 50%;
    border: 2px solid var(--unchecked-color);
    background: ${colors.neutrals.white};
  }

  .input:checked::before {
    content: '';
    background: ${colors.neutrals.white} url(${checkedIcon}) no-repeat center center;
    background-size: 60%;
    left: calc(100% - 2rem);
    transition: left 0.05s cubic-bezier(0.9, 0.05, 0.7, 0.19) 0.05s;
    border-color: var(--checked-color);
  }

  .input:checked {
    background-color: var(--checked-color);
  }

  .input:checked:hover {
    background-color: var(--checked-hover-color);
  }

  .input:disabled,
  .input:disabled:checked:hover {
    background: ${colors.neutrals[200]};
  }
  .input:disabled::before,
  .input:disabled:checked::before {
    border-color: ${colors.neutrals[200]};
  }
`
