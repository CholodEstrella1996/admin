import { TabsLanguageNew } from 'utils/models/modelsBase'

const englishContent = {
  id: 155,
  name: 'Laboratorio de Quimica 1',
  description: 'Reacciones químicas inorgánicas.',
  content: {
    id: 1,
    url: 'https://s3/material1.pdf',
    name: 'material1[EN].pdf',
    kind: 'pdf',
    format: {
      extension: 'pdf',
      contentType: 'application/pdf',
    },
  },
  type: {
    id: 155,
    name: 'Guide',
  },
  language: {
    id: 30,
    name: 'English',
    languageCode: 'us',
    defaultLanguage: false,
  },
  authorities: [
    {
      id: 150,
      name: 'student',
    },
  ],
}

const spanishContent = {
  id: 156,
  name: 'Laboratorio de Quimica 1',
  description: 'Reacciones químicas inorgánicas.',
  content: {
    id: 1,
    url: 'https://s3/material1.pdf',
    name: 'material1[ES].pdf',
    kind: 'pdf',
    format: {
      extension: 'pdf',
      contentType: 'application/pdf',
    },
  },
  type: {
    id: 155,
    name: 'Guide',
  },
  language: {
    id: 30,
    name: 'Español',
    languageCode: 'es-MX',
    defaultLanguage: false,
  },
  authorities: [
    {
      id: 155,
      name: 'student',
    },
  ],
}

const portugueseContent = {
  id: 157,
  name: 'Laboratorio de Quimica 1',
  description: 'Reacciones químicas inorgánicas.',
  content: {
    id: 1,
    url: 'https://s3/material1.pdf',
    name: 'material1[PT].pdf',
    kind: 'pdf',
    format: {
      extension: 'pdf',
      contentType: 'application/pdf',
    },
  },
  type: {
    id: 155,
    name: 'Guide',
  },
  language: {
    id: 32,
    name: 'Português',
    languageCode: 'pt-BR',
    defaultLanguage: false,
  },
  authorities: [
    {
      id: 155,
      name: 'student',
    },
  ],
}

const typeOptions = {
  content: [
    {
      id: 154,
      name: 'Guide',
    },
    {
      id: 155,
      name: 'Tutorial',
    },
    {
      id: 156,
      name: 'Webinar',
    },
  ],
}
const authoritiesOptions = {
  content: [
    {
      id: 150,
      name: 'Student',
    },
    {
      id: 152,
      name: 'Theachers',
    },
  ],
}

const languagesMaterial: TabsLanguageNew = {
  data: {
    content: [
      {
        name: 'English',
        id: 1,
        description: '',
        language: { id: 2, name: 'English', languageCode: 'en-US', defaultLanguage: true },
        content: {
          id: 344,
          name: 'fileEN',
          url: 'https://s3-cloudlabas-dev.s3.amazonaws.com/public/image/file_1656441012785.webp',
          kind: 'image',
          format: {
            extension: 'webp',
            contentType: 'image/webp',
          },
        },
      },
      {
        name: 'Español',
        id: 2,
        description: '',
        language: { id: 1, name: 'Español', languageCode: 'es-MX', defaultLanguage: false },
        content: {
          id: 344,
          name: 'fileES',
          url: 'https://s3-cloudlabas-dev.s3.amazonaws.com/public/image/file_1656441012785.webp',
          kind: 'image',
          format: {
            extension: 'webp',
            contentType: 'image/webp',
          },
        },
      },
      {
        name: 'Português',
        id: 3,
        description: '',
        language: { id: 3, name: 'Português', languageCode: 'pt', defaultLanguage: false },
        content: {
          id: 344,
          name: 'filePT',
          url: 'https://s3-cloudlabas-dev.s3.amazonaws.com/public/image/file_1656441012785.webp',
          kind: 'image',
          format: {
            extension: 'webp',
            contentType: 'image/webp',
          },
        },
      },
    ],
  },
}

export {
  englishContent,
  spanishContent,
  portugueseContent,
  typeOptions,
  authoritiesOptions,
  languagesMaterial,
}
