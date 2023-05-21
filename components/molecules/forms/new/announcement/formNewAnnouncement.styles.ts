import css from 'styled-jsx/css'

export const FormNewAnnouncementLocalStyles = css`
  .formAnnouncement__container {
    display: flex;
    width: 55rem;
    height: 30rem;
    overflow-y: auto;
    padding-right: 0.5rem;
  }
  .formAnnouncement__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
  }

  .formAnnouncement__label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
`
