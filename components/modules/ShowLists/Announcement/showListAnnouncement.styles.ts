import theme from '@folcode/clabs.others.theme-provider'
import css from 'styled-jsx/css'

export const ShowListAnnouncementLocalStyles = css`
  .subscription__container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: ${theme.colors.neutrals.white};
    padding: 1.5rem;
    box-shadow: 0 0.25px 1px rgba(0, 0, 0, 0.039), 0 0.85px 3px rgba(0, 0, 0, 0.19);
    border-radius: 2rem;
  }
  .subscription__container__titles {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .subscription__grid {
    flex: none;
    order: 0;
    flex-grow: 1;
    gap: 1rem;
  }
  .subscription__padding {
    padding-bottom: 1rem;
  }
  .subscription_filters_content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background: #f5f5fb;
    border-radius: 1rem;
  }
  .filters-padding {
    padding-bottom: 0.5rem;
    margin-left: 1rem;
  }

  .filters-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background: #f5f5fb;
    border-radius: 1rem;
  }
  .filters-input,
  .filters-select {
    width: 50%;
  }
  .filters-button {
    padding-top: 1.5rem;
  }
  .subscription__icons {
    padding-top: 0.1rem;
    padding-left: 0.6rem;
  }
`
