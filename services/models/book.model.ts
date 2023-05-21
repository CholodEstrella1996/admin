import { Application } from './application.model'
import { Downloadables } from './applicationTechnical.model'

// Response Book
export type ApiResponseBook = {
  id: number
  name: string
  description: string
  visible: boolean
  kind?: string
  year: number
  area: Area
  categories: Category[]
  iconUrl?: string
  edition: string
}

export type ApiResponseBookTopic = {
  id: number
  name: string
  description: string
  visible: boolean
  kind: string
}

export type ApiResponseListThemes = {
  content: ContentListBook[]
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

export type ApiResponseTopicLabs = {
  content: ContentLabs[]
  pageable: string
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
  sort: Sort
  size: number
  number: number
  numberOfElements: number
  empty: boolean
}

export type ApiResponseTopicLearningUnits = {
  id: number
  name: string
  productUnitId: number
  classroomCode: string
  iconUrl: string
  keywords: string[]
  applicationType: {
    id: number
    name: string
  }
  description?: string
  applications?: Application[]
  lastVersion?: LastVersion
  defaultPackageId: number
}

type LastVersion = {
  applicationId: number
  description: string
  downloadables: Downloadables[]
  id: number
  securityVersionNumber: number
  versionNumber: number
}

export type Area = {
  id: number
  name: string
  productUnitId: number
  iconUrl: string
  color: string
  description: string
  keywords: string[]
  visible: boolean
}
export type ContentListBook = {
  id: number
  name: string
  description: string
  visible: boolean
  iconUrl?: string
  year?: number
}

export type ContentLabs = {
  id: number
  name: string
  description: string
  iconUrl?: string
  productUnitId: number
  classroomCode: string
  type: Tag
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

export type BookParams = {
  category?: string
  kind?: string
  parentId?: number
}

export type PostPutBook = {
  name: string
  visible: boolean
  year?: number | string
  kind: string
  parentId: number | string
  areaId?: number | string
  tagIds?: number[] | string[]
  edition?: string
}

// Response Select new book
export type ApiResponseSelectArea = {
  content: ContentArea[]
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

export type ApiResponseSelect = {
  content: ContentSelect[]
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

export type ContentSelect = {
  id: number
  name: string
}

export type ContentArea = {
  id: number
  name: string
  iconUrl: string
  description: string
  color: string
  visible: boolean
}

type Pageable = {
  sort: Sort
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
}

type Sort = {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}
