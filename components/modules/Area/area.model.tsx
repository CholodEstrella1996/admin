export type AreaService = {
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
