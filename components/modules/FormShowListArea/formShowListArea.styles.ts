import theme from '@folcode/clabs.others.theme-provider'

const css = String.raw
const FormShowListAreaStyles = () => {
  const { colors } = theme
  return css`
    .showArea__container {
      display: flex;
      flex-direction: column;
      border-radius: 2rem;
      box-shadow: 0 0.016rem 0.063rem rgba(0, 0, 0, 0.039), 0 0.053rem 0.188rem rgba(0, 0, 0, 0.19);
      padding: 1rem;
      background-color: ${colors.neutrals.white};
    }

    .showArea__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .showArea__subtitle {
      padding: 0.5rem 0 2rem;
    }

    .showArea__button p {
      color: ${colors.neutrals.white};
    }
  `
}
export default FormShowListAreaStyles
