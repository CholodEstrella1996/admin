import { Content } from 'utils/models/modelsBase'
import { Options } from 'utils/models/reactFormFieldsTabs'

export type ResponseBase = {
  pageable: string
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

export type ResponseMaterial = ResponseBase & {
  id: number
  content: Content[]
}

export type ResponseOptions = ResponseBase & {
  content: Options[]
}

export type Sort = {
  sorted: boolean
  rted: boolean
  empty: boolean
}

export type Format = {
  extension: string
  contentType: string
}
