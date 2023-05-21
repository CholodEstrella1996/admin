import { GroupsByIdResponse } from 'services/models/groups.model'
import { TopicListResponse } from 'services/models/topic.model'

export type FormDetailEditorialBookProps = {
  idBook: number
  tableSubTitle?: string
  buttonText?: string
  dataBook: GroupsByIdResponse
  dataTable?: TopicListResponse
  idEditorial: number
  onDeleteBookTopic: (id: number) => void
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  onRowsPaginationChange?: (rowsPerPage: number) => void
}

export type Section = {
  content: ContentTable[]
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

export type DetailBookTable = {
  id: number
  name: string
  description: string
}
type ContentTable = {
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

export type DataApi = {
  id: number
  name: string
  description: string
  visible: boolean
  year: number
  area: Area
  categories: Category[]
}

export type Area = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
  tags: Tag[]
}

export type Tag = {
  id: number
  name: string
}
