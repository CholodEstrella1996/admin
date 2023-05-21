import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

const { colors } = theme

export const InvitesStyles = css`
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 0 2rem;
    gap: 1.5rem;
  }
  .header__button {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .header__label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .header_label__title {
    width: fit-content;
    padding: 0.06rem 0.5rem;
    border-radius: 1.15rem;
    background-color: ${colors.neutrals.white};
  }
  .back__arrow {
    all: unset;
    float: left;
    border-radius: 100%;
    color: ${colors.primary[500]};
    margin-right: 0.4rem;
    padding: 0.3rem 0.2rem 0 0.2rem;
  }
  .back__arrow:hover {
    cursor: pointer;
  }
  .header__customer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .invite {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .invite__card {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    flex: 1;
    background: ${colors.neutrals.white};
    border-radius: 1rem;
  }
  .invite__card__title {
    padding: 1rem;
    border-bottom: 2px solid ${colors.primary[500]};
    text-align: center;
  }
  .message__card__title {
    padding: 1rem;
    border-bottom: 1px solid ${colors.neutrals[100]};
  }
  .invite__card__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
  }

  .highlight {
    background: ${colors.neutrals[50]};
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .mailsCounter {
    margin-top: -2.5rem;
    z-index: 3;
    width: 100%;
    text-align: right;
    padding: 0 1rem;
  }

  .tag {
    border-radius: 0.5rem;
  }
`

export const InvitesStylesGlobal = css.global`
  .react-multi-email {
    border: 2px solid ${colors.neutrals[300]};
    border-radius: 2rem;
    min-height: 19rem;
    overflow: hidden;
    padding: 0.5rem;
  }
  .react-multi-email:hover {
    border-color: ${colors.primary[500]};
  }
  .react-multi-email:focus,
  .react-multi-email.focused {
    border-color: ${colors.neutrals[300]};
  }
  .react-multi-email.empty > span[data-placeholder] {
    margin: 0.5rem;
  }
  .react-multi-email input {
    margin: 0.5em;
  }
`
