export const DetailTabsMock = {
  content: [
    {
      id: 1,
      name: 'Matemática',
      price: 100,
      description:
        'Math is a subject that is related to the study of numbers and their operations.',
      visible: true,
      productUnitId: 14,
      defaultPackage: true,
      iconUrl: 'https://s3/icon.webp',
      color: '#ff0000',
      keywords: ['Keyword1'],
      language: {
        id: 1,
        name: 'English United States',
        languageCode: 'en-US',
        defaultLanguage: true,
      },
    },
    {
      id: 2,
      name: 'Matemática',
      price: 100,
      description:
        'Math is a subject that is related to the study of numbers and their operations.',
      visible: true,
      productUnitId: 14,
      defaultPackage: true,
      iconUrl: 'https://s3/icon.webp',
      color: '#ff0000',
      keywords: ['Screw-nut', 'Rod-crank', 'Worm-gear'],
      language: {
        id: 31,
        name: 'Español México',
        languageCode: 'es-MX',
        defaultLanguage: false,
      },
    },
    {
      id: 3,
      name: 'Math',
      price: 100,
      description:
        'Math is a subject that is related to the study of numbers and their operations.',
      visible: true,
      productUnitId: 15,
      defaultPackage: true,
      iconUrl: 'https://s3/icon.webp',
      color: '#ff0000',
      keywords: ['Screw-nut', 'Rod-crank'],
      language: {
        id: 1,
        name: 'portugues',
        languageCode: 'pt-BR',
        defaultLanguage: true,
      },
    },
  ],
}

export const DetailMaterialMock = {
  content: [
    {
      id: 155,
      name: 'Chemistry Lab 1',
      description: 'Inorganic chemical reactions.',
      content: {
        id: 1,
        url: 'https://s3/material1.pdf',
        name: 'material1.pdf',
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
      authorities: [
        {
          id: 155,
          name: 'student',
        },
      ],
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    offset: 0,
    pageNumber: 0,
    unpaged: false,
    paged: true,
  },
  last: false,
  totalPages: 23,
  totalElements: 46,
  size: 46,
  number: 46,
  sort: {
    sorted: true,
    unsorted: false,
    empty: false,
  },
  first: true,
  numberOfElements: 2,
  empty: false,
}
