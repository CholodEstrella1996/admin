import { TabsLanguageNew } from 'utils/models/modelsBase'

const title = {
  information: 'Información de la Temática',
  detail: 'Administración del Store',
}

const subtitle = {
  subTitle1: 'Nombre de la temática',
  subTitle2: 'Descripción de la temática',
  subTitle3: 'Palabras clave',
  subTitle4: 'Disponibilidad',
  subTitle5: 'Icono',
  subTitle6: 'Precio (USD)',
}
const languages: TabsLanguageNew = {
  data: {
    content: [
      {
        name: 'English',
        id: 1,
        description: '',
        language: { id: 2, name: 'English', languageCode: 'en-US', defaultLanguage: true },
        keywords: [],
      },
      {
        name: 'Español',
        id: 2,
        description: '',
        language: { id: 1, name: 'Español', languageCode: 'es-MX', defaultLanguage: false },
        keywords: [],
      },
      {
        name: 'Português',
        id: 3,
        description: '',
        language: { id: 3, name: 'Português', languageCode: 'pt', defaultLanguage: false },
        keywords: [],
      },
    ],
  },
}

export { title, subtitle, languages }
