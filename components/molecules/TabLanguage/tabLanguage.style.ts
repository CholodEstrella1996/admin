import theme from '@folcode/clabs.others.theme-provider'

const css = String.raw
const TabLanguageStyle = () => {
  const { colors } = theme
  return css`
    .tab-padding__bottom {
      padding-bottom: 1.5rem;
    }
    .tab-padding__Bottom--small {
      padding-bottom: 0.5rem;
    }

    .tab-names {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5rem;
      color: ${colors.primary[500]};
    }

    .tab-app__type {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
    }

    .application__type {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chips-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .space__select {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .input__row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
      gap: 0.5rem;
    }
    .input__column {
      flex-grow: 0.5;
    }
  `
}
export default TabLanguageStyle
