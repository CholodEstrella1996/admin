import { Content } from 'utils/models/modelsBase'

export type AreaResponse = {
  getTabsArea: GetTabsArea
  getListAreas: GetListAreas
  deleteArea: DeleteArea
  putIcon: PutIcon

  getAreaTranslation: GetAreaTranslation
  postAreaEnglishService: PostAreaEnglishService
  putAreaEnglishService: PutAreaEnglishService
  putAreaTranslationsService: PutAreaTranslationsService

  getAreaTree: GetAreaTree
}

// General
export type AreaGeneralResponse = {
  content: Content[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
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
  size: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  totalElements: number
  totalPages: number
}

// Endpoints
type GetTabsArea = {
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
type GetAreaTranslation = AreaGeneralResponse
type GetListAreas = AreaGeneralResponse
type DeleteArea = AreaGeneralResponse

type PostAreaEnglishService = Content
type PutAreaTranslationsService = Content
type PutAreaEnglishService = Content
type PutIcon = Content

type GetAreaTree = {
  label: string
  content: {
    id: number
    name: string
    kind: string
    contents: {
      id: number
      name: string
      kind: string
      contents: {
        id: number
        name: string
        iconUrl: null | string
        kind: string
        type: {
          id: number
          name: string
        }
      }[]
    }[]
  }[]
}
