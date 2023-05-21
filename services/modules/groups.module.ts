import { GATEWAY_GUIDE_SERVICE } from 'constants/api.constants'
import { ApiResponseBook } from 'services/models/book.model'

import api from '../api.client'
import {
  GroupsByIdResponse,
  GroupsListResponse,
  GroupsTranslationsResponse,
} from '../models/groups.model'

export type PaginationParams = {
  id?: number
  pageNumber: number
  pageSize: number
  kind?: string
  category?: string
  parentId?: number
}

const queryParams = ({ category, kind, parentId, pageNumber, pageSize }: PaginationParams) => {
  const arrayParams = []
  if (kind) arrayParams.push(`kind=${kind}`)
  if (category) arrayParams.push(`category=${category}`)
  if (parentId) arrayParams.push(`parentId=${parentId}`)
  if (pageNumber) arrayParams.push(`pageNumber=${pageNumber}`)
  if (pageSize) arrayParams.push(`pageSize=${pageSize}`)
  const params = arrayParams.join('&')
  return params
}

export const groupsService = {
  getTranslations: (id: number) =>
    api.get<GroupsTranslationsResponse>(`${GATEWAY_GUIDE_SERVICE}/groups/${id}/translations`),

  getGroupsById: (id: number) =>
    api.get<GroupsByIdResponse>(`${GATEWAY_GUIDE_SERVICE}/groups/${id}`),

  getGroupsList: (paramsRequest: PaginationParams) =>
    api.get<GroupsListResponse>(`${GATEWAY_GUIDE_SERVICE}/groups?${queryParams(paramsRequest)}`),

  deleteById: (id: number) => api.delete(`${GATEWAY_GUIDE_SERVICE}/groups/${id}`),

  postGroup: (bodyData: FormData) =>
    api.post<ApiResponseBook>(`${GATEWAY_GUIDE_SERVICE}/groups`, bodyData),

  putGroup: (bodyData: FormData, id: number) =>
    api.put<ApiResponseBook>(`${GATEWAY_GUIDE_SERVICE}/groups/${id}`, bodyData),
}
