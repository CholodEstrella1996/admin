import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const ShowlistTermAndConditionLocalStyles = css`
  .termAndCondition__container__titles {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .termAndCondition__grid {
    flex: none;
    order: 0;
    flex-grow: 1;
    gap: 1rem;
  }
  .termAndCondition__padding {
    padding-bottom: 1rem;
  }
  .termAndCondition__button {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .header-title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .termAndCondition-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: ${theme.colors.neutrals.white};
    padding: 1.5rem;
    box-shadow: 0 0.015625rem 0.0625rem rgba(0, 0, 0, 0.039),
      0 0.053125rem 0.1875rem rgba(0, 0, 0, 0.19);
    border-radius: 2rem;
  }
`
