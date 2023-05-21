import { DataEditorialStore } from 'components/modules/FormDetailsEditorial/formDetailsEditorial.model'
import { Section } from 'components/modules/FormDetailsEditorialBook/formDetailEditorialBook.model'
import { ApiResponseEditorial } from 'components/molecules/FormNewEditEditorial/formNewEditEditorial.model'
import { GATEWAY_GUIDE_SERVICE } from 'constants/api.constants'

import api from '../api.client'

export const editorialService = {
  getEditorials: () => api.get<Section>(`${String(GATEWAY_GUIDE_SERVICE)}/groups?kind=publisher`),

  getEditorialsById: (id: number) =>
    api.get<DataEditorialStore>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),

  getEditorialList: (id: number) =>
    api.get<ApiResponseEditorial>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),

  postEditorial: (data: FormData) =>
    api.post<ApiResponseEditorial>(`${String(GATEWAY_GUIDE_SERVICE)}/groups`, data),

  putEditorial: (id: number, data: FormData) =>
    api.put<ApiResponseEditorial>(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`, data),

  deleteEditorial: (id: number) => api.delete(`${String(GATEWAY_GUIDE_SERVICE)}/groups/${id}`),
}
