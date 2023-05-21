import { PRODUCT_SERVICE, GATEWAY_PRODUCT_SERVICE } from 'constants/api.constants'

import api from '../api.client'
import { ResponseMaterial, ResponseOptions } from '../models/material.model'

const materialService = {
  // TODO: falla al apuntar a la GATEWAY
  deleteMaterial: async (id: number) => {
    void api.delete(`${PRODUCT_SERVICE}/pedagogical-materials/${id}`)
  },

  // TODO: falla al apuntar a la GATEWAY
  getMaterialTranslations: (id: number) =>
    api.get<ResponseMaterial>(`${PRODUCT_SERVICE}/pedagogical-materials/${id}/translations`),

  updateMaterialTranslationsBase: async (id: number, dataMaterial: FormData) =>
    api.put(`${GATEWAY_PRODUCT_SERVICE}/pedagogical-materials/${id}`, dataMaterial),

  updateMaterialTranslations: async (id: number, dataMaterial: FormData) =>
    api.put(`${GATEWAY_PRODUCT_SERVICE}/pedagogical-materials/${id}/translations`, dataMaterial),

  // TODO: falla al apuntar a la GATEWAY
  getMaterialAuth: async () => {
    const { data } = await api.get<ResponseOptions>(
      `${PRODUCT_SERVICE}/pedagogical-materials/authorities`,
    )
    return data.content
  },
  // TODO: falla al apuntar a la GATEWAY
  getMaterialType: async () => {
    const { data } = await api.get<ResponseOptions>(
      `${PRODUCT_SERVICE}/pedagogical-materials/types`,
    )
    return data.content
  },
}

export default materialService
