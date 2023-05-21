import { Content } from 'utils/models/modelsBase'

export type Pageable = {
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

export type TopicParams = {
  id: number
  pageNumber: number
  pageSize: number
}

export type TopicListResponse = {
  content: ContentList[]
  pageable: Pageable
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

export type ContentList = {
  id: number
  name: string
  productUnitId: number
  iconUrl: string
  description: string
  keywords: string[]
}

export type TopicResponse = {
  content: Content[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  size: number
  number: number
  numberOfElements: number
  empty: boolean
}

export type PostTopicProps = {
  areaId?: number
  defaultPackagePrice?: number
  description: string
  keywords: string[] | null
  name: string
  visible?: boolean
  languageCode?: string
}
