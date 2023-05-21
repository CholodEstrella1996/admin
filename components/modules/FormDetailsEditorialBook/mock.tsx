export const FormDetailsMock = {
  content: [
    {
      id: 1,
      name: 'PackageName',
      price: 100,
      type: 'area',
      description: 'PackageDescription',
      pictureUrl: 'https://server/s3/picture.webp',
      visible: true,
      productUnitId: 1,
      defaultPackage: true,
      media: [
        {
          id: 1,
          content: {
            id: 1,
            url: 'https://youtube.com/video',
            name: 'Webinar 1',
            kind: 'video',
          },
        },
      ],
      productUnit: {
        id: 155,
        name: 'Math',
        productUnitId: 14,
        iconUrl: 'https://s3/icon.webp',
        color: '#ff0000',
        description:
          'Math is a subject that is related to the study of numbers and their operations.',
        keywords: [
          {
            id: 1,
            name: 'PalabraClave1',
            language: {
              id: 31,
              name: 'Español México',
              languageCode: 'es-MX',
              defaultLanguage: false,
            },
          },
        ],
      },
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

export const Content1Mock = {
  id: 1,
  name: 'Titulo del libro',
  description: 'Los matematicos de segundo',
  visible: true,
  year: 2004,
  area: {
    id: 3,
    name: 'Matematicas',
  },
  categories: [
    {
      id: 5,
      name: 'grade',
      tags: [
        {
          id: 15,
          name: '2°',
        },
      ],
    },
    {
      id: 6,
      name: 'level',
      tags: [
        {
          id: 17,
          name: 'Primer ciclo primaria',
        },
      ],
    },
  ],
}

export const DataTableMock = {
  content: [
    {
      id: 155,
      name: 'Chemistry Lab 1',
      description: 'Inorganic chemical reactions.',
      productUnitId: 14,
      classroomCode: 'CLASS-CODE-1',
      type: {
        id: 155,
        name: 'laboratory',
      },
    },
    {
      id: 156,
      name: 'Chemistry Lab 1',
      description: 'Inorganic chemical reactions.',
      productUnitId: 14,
      classroomCode: 'CLASS-CODE-1',
      type: {
        id: 155,
        name: 'laboratory',
      },
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
