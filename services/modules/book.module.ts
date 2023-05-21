import { GATEWAY_GUIDE_SERVICE, GATEWAY_PRODUCT_SERVICE } from 'constants/api.constants'
import {
  ApiResponseSelectArea,
  ApiResponseSelect,
  BookParams,
  ApiResponseBook,
  PostPutBook,
  ApiResponseBookTopic,
  ApiResponseListThemes,
  ApiResponseTopicLabs,
} from 'services/models/book.model'
import { Section } from 'services/models/section.model'

import api from '../api.client'

const queryParams = ({ kind, category, parentId }: BookParams) => {
  const queryParamsArray = []
  if (kind) queryParamsArray.push(`kind=${kind}`)

  if (category) queryParamsArray.push(`category=${category}`)

  if (parentId) queryParamsArray.push(`parentId=${parentId}`)

  const params = queryParamsArray.join('&')
  return params
}

export const bookService = {
  getBookSelectArea: () => api.get<ApiResponseSelectArea>(`${GATEWAY_PRODUCT_SERVICE}/areas`),
  getBookSelect: (paramsRequest: BookParams) =>
    api.get<ApiResponseSelect>(
      `${String(GATEWAY_GUIDE_SERVICE)}/tags?${queryParams(paramsRequest)}`,
    ),
  postNewBook: (bodyData: PostPutBook) =>
    api.post<ApiResponseBook>(`${String(GATEWAY_GUIDE_SERVICE)}/groups`, bodyData),
  getBook: (id: number) =>
    api.get<ApiResponseBook>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),
  putBook: (id: number, bodyData: PostPutBook) =>
    api.put<ApiResponseBook>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`, bodyData),
  getListTopic: (paramsRequest: BookParams) =>
    api.get<ApiResponseListThemes>(
      `${String(GATEWAY_GUIDE_SERVICE)}/groups?${queryParams(paramsRequest)}`,
    ),
  deleteBookTopic: (id: number) => api.delete(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),
  getBooks: (paramsRequest: BookParams) =>
    api.get<Section>(`${String(GATEWAY_GUIDE_SERVICE)}/groups?${queryParams(paramsRequest)}`),
  deleteBooks: (id: number) => api.delete(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),

  // Topic
  getBookTopic: (id: number) =>
    api.get<ApiResponseBookTopic>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),
  postNewTopic: (bodyData: PostPutBook) =>
    api.post<ApiResponseBookTopic>(`${String(GATEWAY_GUIDE_SERVICE)}/groups`, bodyData),
  putBookTopic: (id: number, bodyData: PostPutBook) =>
    api.put<ApiResponseBookTopic>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`, bodyData),
  getLabsTopic: (id: number) =>
    api.get<ApiResponseTopicLabs>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}/product-units`),
  deleteLabsTopic: (idBookTopic: number, productUnitId: number) =>
    api.delete<ApiResponseTopicLabs>(
      `${String(GATEWAY_GUIDE_SERVICE)}/groups/${idBookTopic}/product-unit/${productUnitId}`,
    ),
}
