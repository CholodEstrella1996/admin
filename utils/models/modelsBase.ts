export type BaseResponse = {
  content: Content
  pageable: Pagination
}

export type Content = {
  id: number
  name: string
  productUnitId?: number
  iconUrl?: string
  color?: string
  description: string
  keywords?: string[]
  type?: {
    id: number
    name: string
  }
  language: {
    id: number
    name: string
    languageCode: string
    defaultLanguage: boolean
  }
  classroomCode?: string
  content?: Media
  authorities?: {
    id: number
    name: string
  }[]
}

export type Media = {
  id: number
  url: string
  name: string
  kind: string
  format?: {
    extension: string
    contentType: string
  }
}

export type Pagination = {
  pageable: {
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    offset: number
    pageSize?: number
    pageNumber: number
    unpaged: boolean
    paged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type ValidationFieldsTypes = {
  EN: {
    name: string
    description: string
    keywords?: string
  }
  ES: {
    name: string
    description: string
    keywords?: string
  }
  PT: {
    name: string
    description: string
    keywords?: string
  }
}

export type TabsLanguageNew = {
  data: {
    content: Content[]
  }
}

export type Delete = {
  description: string
  iconUrl: string
  id: 0
  keywords: string[]
  name: string
  productUnitId: number
}
