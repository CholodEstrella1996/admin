import { GATEWAY_GUIDE_SERVICE } from 'constants/api.constants'
import { ApiResponseListThemes, BookParams } from 'services/models/book.model'
import { ApiResponseAssignature, PostPutAssignature } from 'services/models/curriculums'

import api from '../api.client'

const queryParams = ({ category, kind, parentId }: BookParams) => {
  const queryParamsArray = []
  if (kind) queryParamsArray.push(`kind=${kind}`)

  if (category) queryParamsArray.push(`category=${category}`)

  if (parentId) queryParamsArray.push(`parentId=${parentId}`)

  const params = queryParamsArray.join('&')
  return params
}

export const curriculumService = {
  // Curriculos

  // Assignature
  getAssignature: (id: number) =>
    api.get<ApiResponseAssignature>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),
  postNewAssignature: (bodyData: PostPutAssignature) =>
    api.post<ApiResponseAssignature>(`${String(GATEWAY_GUIDE_SERVICE)}/groups`, bodyData),
  putAssignature: (id: number, bodyData: PostPutAssignature) =>
    api.put<ApiResponseAssignature>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`, bodyData),

  // Grade
  getGrade: (id: number) =>
    api.get<ApiResponseAssignature>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),
  getListTopics: (paramsRequest: BookParams) =>
    api.get<ApiResponseListThemes>(
      `${String(GATEWAY_GUIDE_SERVICE)}/groups?${queryParams(paramsRequest)}`,
    ),
  deleteTopic: (id: number) => api.delete(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),
  getListGrades: (paramsRequest: BookParams) =>
    api.get<ApiResponseListThemes>(
      `${String(GATEWAY_GUIDE_SERVICE)}/groups?${queryParams(paramsRequest)}`,
    ),
  deleteGrade: (id: number) => api.delete(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),

  // Topic
  getGradeTopic: (id: number) =>
    api.get<ApiResponseAssignature>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),
  postNewGradeTopic: (bodyData: PostPutAssignature) =>
    api.post<ApiResponseAssignature>(`${String(GATEWAY_GUIDE_SERVICE)}/groups`, bodyData),
  putGradeTopic: (id: number, bodyData: PostPutAssignature) =>
    api.put<ApiResponseAssignature>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`, bodyData),
}
