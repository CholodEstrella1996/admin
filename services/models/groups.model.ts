import { Content } from 'utils/models/modelsBase'

export type GroupsTranslationsResponse = {
  content: Content[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    unpaged: boolean
  }
  size: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  totalElements: number
  totalPages: number
}

export type GroupsByIdResponse = {
  id: number
  name: string
  description: string
  visible: boolean
  kind?: string
  year: number
  area: {
    id: number
    name: string
    productUnitId: number
    iconUrl: string
    color: string
    description: string
    keywords: string[]
    visible: boolean
  }
  categories: {
    id: number
    name: string
    tags: {
      id: number
      name: string
    }[]
  }[]
  iconUrl?: string
  edition?: string
}

export type GroupsListResponse = {
  content: {
    id: number
    name: string
    productUnitId: number
    iconUrl: string
    description: string
    keywords: string[]
  }[]
  pageable: {
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  size: number
  number: number
  empty: boolean
}
