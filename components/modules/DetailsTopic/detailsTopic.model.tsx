import { Media } from 'components/molecules/TabLanguage/tabsLanguage.model'
import { Content } from 'utils/models/modelsBase'

export type DetailTopicProps = {
  storeName?: string
  idTopic: number
  storeTopic: {
    visible?: boolean
    price?: number
    media?: Media[]
    iconUrl?: string
    color?: string
  }
  dataApplications?: ApplicationAreaData
  dataTabs: Content[]
  subtitleApps: string
  onDetailApplication: (id: number) => void
  onDeleteApplication: (id: number) => void
  pageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  rowsPaginationChange?: (rowsPerPage: number) => void
}

export type ApplicationAreaData = {
  content: Content2[]
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

export type TabAreaData = {
  content: ContentTab[]
}

type Content2 = {
  id: number
  name: string
  description: string
  productUnitId: number
  classroomCode: string
  type: Type
  iconUrl: string
  color: string
}

export type ContentElement = {
  id: number
  name: string
  price: number
  type: string
  description: string
  pictureUrl: string
  visible: boolean
  productUnitId: number
  defaultPackage: boolean
  media: Media[]
  productUnit: ProductUnit
}

type ContentTab = {
  id: number
  name: string
  productUnitId: number
  iconUrl: string
  description: string
  keywords: Keyword[]
  language: Language
  type: string
  productUnit: ProductUnit
}

interface Type {
  id: number
  name: string
}

type ProductUnit = {
  id: number
  name: string
  productUnitId: number
  iconUrl: string
  color: string
  description: string
  keywords: Keyword[]
}

type Keyword = {
  id: number
  name: string
  language: Language
}

type Language = {
  id: number
  name: string
  languageCode: string
  defaultLanguage: boolean
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
