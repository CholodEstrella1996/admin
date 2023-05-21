import { GATEWAY_PRODUCT_SERVICE } from 'constants/api.constants'
import { AreaRequest } from 'services/models/areas/request.model'
import { AreaResponse } from 'services/models/areas/response.model'
import { RFile } from 'utils/models/reactFormFieldsTabs'

import api from '../api.client'

type GetListAreas = {
  pageNumber?: number
  pageSize?: number
}

type GetAreaTreeParams = {
  applicationType?: 'Laboratory' | 'Learning Unit'
  applicationSearchQuery?: string
}

export const areaService = {
  // General
  getTabsArea: (id: number) =>
    api.get<AreaResponse['getTabsArea']>(`${GATEWAY_PRODUCT_SERVICE}/areas/${id}/translations`),

  getListAreas: (params: GetListAreas) =>
    api.get<AreaResponse['getListAreas']>(`${GATEWAY_PRODUCT_SERVICE}/areas`, { params }),

  deleteArea: (id: number) =>
    api.delete<AreaResponse['deleteArea']>(`${GATEWAY_PRODUCT_SERVICE}/areas/${id}`),

  putIcon: (dataFile: RFile, id: number) => {
    const formData = new FormData()
    formData.append('file', dataFile.data as File)
    return api.put<AreaResponse['putIcon']>(`${GATEWAY_PRODUCT_SERVICE}/areas/${id}/icon`, formData)
  },

  // Translations and Languages
  getAreaTranslation: (id: number) =>
    api.get<AreaResponse['getAreaTranslation']>(
      `${GATEWAY_PRODUCT_SERVICE}/areas/${id}/translations`,
    ),

  postAreaEnglishService: (body: AreaRequest['postAreaEnglishService']) =>
    api.post<AreaResponse['postAreaEnglishService']>(`${GATEWAY_PRODUCT_SERVICE}/areas`, body),

  putAreaEnglishService: (body: AreaRequest['putAreaEnglishService'], id: number) =>
    api.put<AreaResponse['putAreaEnglishService']>(`${GATEWAY_PRODUCT_SERVICE}/areas/${id}`, body),

  putAreaTranslationsService: (body: AreaRequest['putAreaTranslationsService'], id: number) =>
    api.put<AreaResponse['putAreaTranslationsService']>(
      `${GATEWAY_PRODUCT_SERVICE}/areas/${id}/translations`,
      body,
    ),

  // Subscriptions
  getAreaTree: (params?: GetAreaTreeParams) =>
    api.get<AreaResponse['getAreaTree']>(`${GATEWAY_PRODUCT_SERVICE}/areas/tree`, {
      params,
    }),
}
