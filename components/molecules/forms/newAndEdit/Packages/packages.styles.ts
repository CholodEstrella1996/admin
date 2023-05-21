import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme
export const packageStyles = css`
  /* Containers */
  .container-customer,
  .container-billing,
  .container-subscription {
    display: flex;
    flex-direction: column;
    width: 55rem;
    gap: 1rem;
    max-height: 55vh;
  }

  .container-customer {
    margin-bottom: 2rem;
  }

  .container-billing {
    overflow-y: auto;
    min-height: 35vh;
    padding-inline: 0.5rem;
    padding-bottom: 0.5rem;
  }

  /* Contents */
  .content-billing,
  .content-subscription,
  .content-invoicingData1,
  .content-lms,
  .lms-subscription {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: baseline;
    width: 100%;
  }

  .content-billing {
    align-items: center;
  }
  .content-subscription {
    width: 50%;
  }

  /* Inputs */
  .input-user1 {
    flex-grow: 0.35;
  }

  .input-user2 {
    flex-grow: 2.2;
  }

  /* Others */
  .label-subscription {
    padding: 0.5rem 0 0 1rem;
  }

  .title-subscription {
    margin-bottom: 0.5rem;
  }
  .overview-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: 60rem;
    min-height: 24rem;
    align-items: flex-start;
  }
  .overview-products,
  .overview-data {
    padding-block: 1rem;
    display: grid;
    gap: 1rem;
  }
  .overview-products {
    width: 50%;
    background-color: ${colors.neutrals.white};
    box-shadow: 0 0 1rem rgb(0 0 0 / 8%);
    border-radius: 1rem;
    padding: 1rem;
  }
  .overview-data {
    gap: 1rem;
    min-width: 25rem;
  }
  .overview-data-par {
    display: grid;
    gap: 0.5rem;
  }
  .overview-data-row-between {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .overview-data-row {
    display: flex;
    flex-direction: row;

    gap: 1.5rem;
  }

  .overview-drop-down-card1 {
    width: 50%;
  }
  .overview-input {
    width: 70%;
  }
  .content-lms-state {
    width: 33%;
  }
  .content-support {
    width: 33%;
  }

  .lms-subscription,
  .content-lms-msj {
    width: 100%;
    align-items: center;
  }
  .content-monouser-institution-parent {
    width: 75%;
  }
  .overview-demo {
    display: flex;
    gap: 1rem;
  }

  .formPackageNewEdit__container {
    display: flex;
    flex-direction: row;
    width: 58rem;
    max-height: 50vh;
    overflow-y: auto;
    gap: 2rem;
    padding-right: 1rem;
  }
  .formPackageNewEdit__tabArea {
    display: flex;
    flex-direction: column;
    flex: auto;
  }
  .formPackageNewEdit__store {
    display: flex;
    flex-direction: column;
    width: 20rem;
    gap: 2rem;
  }

  div :global(.tabEdit__content),
  div :global(.edit__name),
  div :global(.edit__description) {
    display: flex;
    flex-direction: column;
  }

  div :global(.tabEdit__content) {
    gap: 1rem;
  }

  div :global(.edit__color) {
    background-color: ${colors.neutrals[500]};
  }
`
