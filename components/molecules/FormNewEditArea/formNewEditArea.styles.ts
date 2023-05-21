import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const FormNewEditAreaLocalStyles = css`
  .formNewEditArea__container {
    display: flex;
    flex-direction: row;
    width: 58rem;
    max-height: 50vh;
    overflow-y: auto;
    gap: 2rem;
    padding-right: 1rem;
  }
  .formNewEditArea__tabArea {
    display: flex;
    flex-direction: column;
    flex: auto;
  }
  .formNewEditArea__store {
    display: flex;
    flex-direction: column;
    width: 20rem;
    gap: 2rem;
  }
  .detail__content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .store-colorPick {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .colorPick__content {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
  }
  .position-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
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
