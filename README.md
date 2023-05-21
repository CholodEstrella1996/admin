# Next.js con TypeScript

Plantilla de proyecto frontend con Next.js y TypeScript, que incluye lo siguiente:

- Estructura genérica de carpetas y archivos
- **ESlint**: Revisión y corrección de errores
- **Prettier**: Formateo del código de forma automática al guardar cambios y al enviar un commit
- **TypeScript**: Sintaxis y compilación de código
- **Storybook**: Documentación y testeo de componentes UI
- Otras características opcionales, tales como:
  - **Jest**: Testeo de componentes
    > Se encuentra disponible en la rama `with-jest`
  - **Snippets**: Plantillas de código
  - Extensiones recomendadas
  - Configuración básica recomendada para el editor de código
  - **fcode.config.json**: Configuración de la herramienta [folcode-cli]()

## Uso

> ### **Antes de comenzar**
>
> **Configuración Automática**
>
> 1.  Instalar [folcode-cli]()
> 2.  Correr el comando `fcode` en la carpeta donde se desea crear el proyecto
> 3.  Seleccionar la opción `Iniciar un nuevo proyecto`
>
> **Configuración Manual**
>
> 1.  Clonar el proyecto desde [Bitbucket](https://bitbucket.org/travelpaq/react_next_ts/).
> 2.  Eliminar las ramas que no se utilicen (Ejemplo: `with-jest`)
> 3.  Eliminar la carpeta oculta `.git` para limpiar el historial de commits.
> 4.  Inicializar el proyecto con `git init` y `git add .` para agregar todos los archivos al nuevo repositorio.
> 5.  Se recomienda agregar la carpeta `.vscode` al archivo ".gitignore" para evitar que se guarden los archivos de configuración de VS Code.

### Uso general

1. Instalar los paquetes necesarios con el manejador de paquetes de preferencia (npm, yarn, etc.):

   ```bash
   npm install
   # or
   yarn install
   ```

   > En el repositorio no se incluye el `package-lock.json` y `yarn.lock` para brindar la posibilidad al equipo de elegir cual utilizar.

2. Correr el servidor de desarrollo:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Ir a [http://localhost:3000](http://localhost:3000) en tu navegador.

### Uso de Storybook

1. Correr el servidor de desarrollo de Storybook:

   ```bash
   npm run storybook
   # or
   yarn storybook
   ```

2. Ir a [http://localhost:6006](http://localhost:6006) en tu navegador.

## Consideraciones

- Para **crear componentes de forma automática** se puede utilizar la herramienta [folcode-cli]()
- Se puede revisar y formatear el código con [prettier](https://prettier.io/) y [eslint](https://eslint.org/) con los siguientes comandos:

  ```bash
  npm run format
  npm run lint
  # or
  yarn format
  yarn lint
  ```

- Se puede utilizar [CSS Modules](https://github.com/css-modules/css-modules), [Styled-Components](https://www.styled-components.com/), [Sass](https://sass-lang.com/), [styled-jsx](https://github.com/vercel/styled-jsx), [CSS-in-JS](https://cssinjs.org/), entre otras opciones, para crear estilos de componentes.

- Dependiendo de la tecnología de CSS seleccionada, se recomienda utilizar la metodología BEM para el nombrado de clases, sin anidar más de dos "\_\_" por clase.

- Los archivos `.gitkeep` pueden eliminarse una vez que la carpeta en la que están ya tienen algún otro archivo o carpeta.

## Elementos

### Páginas

Archivos que incluyen la lógica de la página antes de que sea renderizada, funciones de consulta a la API y el estado inicial (GetServerSideProps y GetStaticProps), entre otras funciones. **No deberían incluir maquetado, ya que para eso se utilizará un módulo**.

### Componentes

#### Tipos

- `Atom`: Componentes que tiene una única responsibilidad, es decir, que tiene un solo objetivo.
  > Ejemplo:
  >
  > - `Button` --> Disparar un evento
  > - `Input` --> Ingresar texto un campo concreto ("Correo Electrónico", "Contraseña", etc.),
  > - `Text` --> Informar sobre una temática particular,
  > - `Image`, `Link`, `Icon`, `Spinner`, etc.
- `Molecule`: Componentes que contienen más de un átomo, moleculas u otros elementos; y que pueden tener más de una responsabilidad.
  > Ejemplo:
  >
  > - `Card` --> Puede contener una imagen, un texto, un botón, etc. y sus objetivos podrían ser: Mostrar información, disparar eventos, etc.
  > - `Form` --> Puede contener una serie de inputs, un botón, etc. y sus objetivos podrían ser: Enviar un formulario, validar los datos, etc.
  > - `Table`, `Modal`, `Hero`, etc.
- `Module`: Componentes que representan el contenido, estilos y lógica de una página. **Recordar que las páginas no deben incluir maquetado**.
  > Ejemplo:
  >
  > - `Home` --> Página de incio que tiene botones, textos, cards, etc. y que tiene como objetivo es mostrar información.
  > - `Login` --> Página de inicio de sesión que tiene inputs, botones, etc. y que contiene la lógica de autenticación.
  > - `Register` --> Página de registro que tiene inputs, botones, etc. y que contiene la lógica de creación de usuario.
  > - `About`, `Contact`, `Documentation`, etc.

#### Estructura

- `index.tsx`: Componente principal.

- `**.component.tsx`: Presentación visual del componente.

- `**.container.tsx`: Lógica y comportamiento del componente.

- `**.module.css`: Estilos del componente con ámbito local, utilizando CSS Modules.

- `**.stories.tsx`: Información necesaria para poder usarlo en Storybook.

- `**.test.tsx`: Testeo del componente. **Solo está presente si se utilizan tests unitarios**

## Estructura de carpetas y archivos

- `components/`: Carpeta de componentes que incluye las categorías _atoms_, _molecules_ y _modules_.

- `pages/`: Carpeta de páginas que incluye el enrutado del proyecto.

- `pages/index.tsx`: Página principal donde se inicia el proyecto.

- `public/`: Carpeta de archivos estáticos que incluye los assets, principalmente imágenes.

- `styles/`: Carpeta que incluye los estilos globales del proyecto.

- `package.json`: Archivo que contiene las dependencias utilizadas, información del proyecto y los NPM Script, entre otros.

### Configuración

- `.husky/`: Configuración de los comandos que se ejecutan antes de cada commit. En este caso se incluye el _formateo automático_ del código con _Prettier_.

- `.storybook/`: Configuración de Storybook.

- `.vscode/`: Incluye configuraciones, snippets y extensiones recomendadas para el editor de código.

- `.eslintrc`: Configuración de ESLint. Se utilizó la configuración de [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

- `.gitignore`: Indica que archivos no deben ser incluidos en el repositorio.

- `.prettierignore`: Indica que archivos no deben ser formateados con Prettier.

- `.prettierrc`: Configuración de Prettier.

- `next.config.js`: Configuración de Next.js

- `tsconfig.json`: Configuración de TypeScript
