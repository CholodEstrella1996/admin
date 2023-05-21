import { GATEWAY_PRODUCT_SERVICE } from 'constants/api.constants'
import {
  PostTopicProps,
  TopicResponse,
  TopicListResponse,
  TopicParams,
} from 'services/models/topic.model'
import { Content, Delete } from 'utils/models/modelsBase'
import { RFile } from 'utils/models/reactFormFieldsTabs'

import api from '../api.client'

const queryParams = (paramsRequest: TopicParams) => {
  const queryParamsArray = []
  if (paramsRequest.pageNumber) {
    queryParamsArray.push(`pageNumber=${paramsRequest.pageNumber}`)
  }
  if (paramsRequest.pageSize) {
    queryParamsArray.push(`pageSize=${paramsRequest.pageSize}`)
  }
  if (paramsRequest.id) {
    queryParamsArray.push(`areaId=${paramsRequest.id}`)
  }
  // si se necesitan mas parámetros replicar if anterior
  const params = queryParamsArray.join('&')
  return params
}

export const topicService = {
  getTopicTranslations: (id: number) =>
    api.get<TopicResponse>(`${GATEWAY_PRODUCT_SERVICE}/topics/${id}/translations`),

  getTopicList: (paramsRequest: TopicParams) =>
    api.get<TopicListResponse>(`${GATEWAY_PRODUCT_SERVICE}/topics?${queryParams(paramsRequest)}`),

  postTopicEnglishService: (bodyData: PostTopicProps) =>
    api.post<Content>(`${GATEWAY_PRODUCT_SERVICE}/topics`, bodyData),

  putTopicTranslationsService: (bodyData: PostTopicProps, id: number) =>
    api.put<Content>(`${GATEWAY_PRODUCT_SERVICE}/topics/${id}/translations`, bodyData),

  putTopicEnglishService: (bodyData: PostTopicProps, id: number) =>
    api.put<Content>(`${GATEWAY_PRODUCT_SERVICE}/topics/${id}`, bodyData),

  putIcon: (dataFile: RFile, id: number) => {
    const formData = new FormData()
    formData.append('file', dataFile.data as File)
    return api.put<Content>(`${GATEWAY_PRODUCT_SERVICE}/topics/${id}/icon`, formData)
  },

  deleteTopic: (id: number) => api.delete<Delete>(`${GATEWAY_PRODUCT_SERVICE}/topics/${id}`),
}
