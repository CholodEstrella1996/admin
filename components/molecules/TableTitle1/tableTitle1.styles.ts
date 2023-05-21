import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme
export const TableTitleStyles = css`
  .tableTitle_container {
    padding: 1rem;
    box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.08);
    border-radius: 1rem;
    background-color: ${colors.neutrals.white};
  }

  .titleButton button p {
    color: ${colors.neutrals.white};
    font-size: medium;
  }

  .tableContainer {
    margin-top: 1.5rem;
  }
`

export const TableTitleGlobalStyles = css.global`
  .titleButton_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`
