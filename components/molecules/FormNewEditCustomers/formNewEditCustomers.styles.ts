import css from 'styled-jsx/css'

export const FormNewEditCustomersLocalStyles = css`
  .container-kinds {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 10rem;
    width: 55rem;
  }
  .content-kinds {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .container-user {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 55rem;
    max-height: 55vh;
    overflow-y: auto;
    min-height: 35vh;
    padding-right: 0.5rem;
  }
  .content-user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    gap: 0.5rem;
  }
  .input-user1 {
    flex-grow: 0.35;
  }
  .input-user2 {
    flex-grow: 2.2;
  }
  .content-avatar {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  .container-institution {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 55rem;
    max-height: 55vh;
    overflow-y: auto;
    min-height: 35vh;
  }
  .container-government {
    display: flex;
    flex-direction: column;
    width: 55rem;
    gap: 0.5rem;
    max-height: 55vh;
    overflow-y: auto;
    min-height: 35vh;
  }
`

export const FormNewEditCustomersGlobalStyles = css.global`
  .select-width {
    width: 100%;
  }
`
