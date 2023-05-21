import css from 'styled-jsx/css'

export const classroomStyles = css`
  .container-classroom {
    display: flex;
    flex-direction: column;
    width: 55rem;
    gap: 1rem;
    max-height: 55vh;
    overflow-y: auto;
    padding-right: 1rem;
  }
  .content-rows {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.75rem;

    width: 100%;
  }

  .content-rows-enabled {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
  }
  .content-subscription {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    width: 100%;
  }

  .title-subscription {
    margin-bottom: 0.5rem;
  }
`
