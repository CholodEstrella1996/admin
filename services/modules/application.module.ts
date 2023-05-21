import { PRODUCT_SERVICE, GATEWAY_PRODUCT_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { ApplicationRequest as Request } from 'services/models/applications/request.model'
import { ApplicationResponse as Response } from 'services/models/applications/response.model'
import convertToMultipart from 'utils/helpers/convertToMultipart'

export const newApplicationService = {
  // General

  createApplication: (body: Request['createApplication']) =>
    api.post<Response['createApplication']>(`${GATEWAY_PRODUCT_SERVICE}/applications`, body),

  updateApplication: (id: number, body: Request['updateApplication']) =>
    api.put<Response['updateApplication']>(`${GATEWAY_PRODUCT_SERVICE}/applications/${id}`, body),

  deleteApplication: (id: number) =>
    api.delete<Response['deleteApplication']>(`${GATEWAY_PRODUCT_SERVICE}/applications/${id}`),

  // Types
  // TODO: falla al apuntar a la GATEWAY
  getTypes: () => api.get<Response['getTypes']>(`${PRODUCT_SERVICE}/applications/types`),

  // Translations
  getTranslations: (id: number) =>
    api.get<Response['getTranslations']>(
      `${GATEWAY_PRODUCT_SERVICE}/applications/${id}/translations`,
    ),

  addTranslation: (id: number, body: Request['addTranslation']) =>
    api.put<Response['addTranslation']>(
      `${GATEWAY_PRODUCT_SERVICE}/applications/${id}/translations`,
      body,
    ),

  // Files
  uploadIcon: (id: number, body: Request['uploadIcon']) =>
    api.put<Response['uploadIcon']>(
      `${GATEWAY_PRODUCT_SERVICE}/applications/${id}/icon`,
      convertToMultipart(body),
    ),

  // Versions
  getVersion: (id: number) =>
    api.get<Response['getVersion']>(`${GATEWAY_PRODUCT_SERVICE}/applications/${id}/last-version`),

  createVersion: (id: number, body: Request['createVersion']) =>
    api.put<Response['createVersion']>(
      `${GATEWAY_PRODUCT_SERVICE}/applications/${id}/last-version`,
      body,
    ),

  uploadVersionDownloadable: (id: number, body: Request['uploadVersionDownloadable']) =>
    api.put<Response['uploadVersionDownloadable']>(
      `${GATEWAY_PRODUCT_SERVICE}/versions/${id}/downloadables`,
      convertToMultipart(body),
    ),
}
