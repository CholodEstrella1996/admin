import css from 'styled-jsx/css'

export const LoginLocalStyles = css`
  .main-container {
    display: grid;
    place-content: center;

    height: 100%;
  }

  .container,
  .form,
  .inputs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .container {
    background-color: var(--neutrals-white-color);
    border-radius: 2rem;
    padding: 4rem 6rem;

    box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.08);
  }

  .inputs-container {
    gap: 1rem;
    width: 24rem;
  }

  .inputs-container > :global(.input) {
    width: 100%;
  }

  /* TODO: Eliminar la siguiente corrección. Esto se usó para no modificar el componente desde la librería */
  .inputs-container :global(.input__formControl) {
    width: 100%;
  }
`

export const LoginGlobalStyles = css.global``
