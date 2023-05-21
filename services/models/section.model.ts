export type SectionModel = {
  getResponse: Section
}

export type Section = {
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

export type Content = {
  id: number
  name: string
  description: string
  iconUrl?: string
  color?: string
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
