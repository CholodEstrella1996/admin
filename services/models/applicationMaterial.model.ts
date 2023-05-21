import { Content } from './section.model'

export type ApplicationMaterials = {
  content: Content[] & Content2[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  sort: Sort
  numberOfElements: number
  size: number
  number: number
  empty: boolean
}

export type Content2 = {
  type?: Type
  authorities?: Type[]
  content?: ContentElement
}

export type Type = {
  id: number
  name: string
}

export type ContentElement = {
  id: number
  name: string
  url: string
  kind: string
  format: Format
}

export type Format = {
  extension: string
  contentType: string
}

type Pageable = {
  sort: Sort
  offset: number
  pageNumber: number
  unpaged: boolean
  paged: boolean
}

export type Sort = {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}
