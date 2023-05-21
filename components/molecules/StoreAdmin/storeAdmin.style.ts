import theme from '@folcode/clabs.others.theme-provider'

const css = String.raw
const StoreAdminStyle = (
  colorSectionBase?: string,
  colorSectionDark?: string,
  colorSectionLight?: string,
) => {
  const { colors } = theme
  return css`
    .store__container,
    .associated__media {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .sections__container {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      gap: 1rem;
      width: 100%;
    }
    .store-box__Content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
    }

    .store-color {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }

    .store-boxBase {
      width: 1.5rem;
      height: 1.5rem;
      background: ${colorSectionBase || ''};
      border-radius: 0.5rem;
    }
    .store-boxDark {
      width: 1.5rem;
      height: 1.5rem;
      background: ${colorSectionDark || ''};
      border-radius: 0.5rem;
    }
    .store-boxLight {
      width: 1.5rem;
      height: 1.5rem;
      background: ${colorSectionLight || ''};
      border-radius: 0.5rem;
    }

    .store-text {
      padding-left: 0.5rem;
      color: ${colors.neutrals[400]};
    }

    .associated__media {
      gap: 0.5rem;
    }
  `
}
export default StoreAdminStyle
