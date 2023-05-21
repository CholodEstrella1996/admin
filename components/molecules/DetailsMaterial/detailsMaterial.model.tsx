export type Material = {
  content: Content[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type DetailsMaterial = {
  id?: number
  name?: string
  description?: string
  content?: ContentDetail
  type: Type
  language: Language
  authorities: Type[]
}

type Type = {
  id: number
  name: string
}

type Language = {
  id: number
  name: string
  languageCode: string
  defaultLanguage: boolean
}

type ContentDetail = {
  id: number
  url: string
  name: string
  kind: string
  format: Format
}

type Format = {
  extension: string
  contentType: string
}

type Content = {
  id: number
  name: string
  color: string
  price: number
  productUnitId: number
  iconUrl: string
  description: string
  keywords: Keyword[]
}

type Keyword = {
  id: number
  name: string
}

type Pageable = {
  sort: Sort
  offset: number
  pageNumber: number
  unpaged: boolean
  paged: boolean
}

type Sort = {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}
