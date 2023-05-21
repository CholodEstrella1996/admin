import { GATEWAY_CUSTOMER_SERVICE, CUSTOMER_SERVICE } from 'constants/api.constants'
import { ApiResponseBook } from 'services/models/book.model'
import { PackageRequest } from 'services/models/packages/request.model'
import { PackageResponse } from 'services/models/packages/response.model'
import { downloadBlob } from 'utils/helpers/downloadBlob'

import api from '../api.client'

export type GetStoreParams = { productUnitId: number }

export type GetPackagesParams = {
  pageSize?: number
  pageNumber?: number
  type?: string
}

export const packageService = {
  // Store
  // TODO: falla al apuntar a la GATEWAY
  getStore: (params: GetStoreParams) =>
    api.get<PackageResponse['getStore']>(`${CUSTOMER_SERVICE}/packages`, { params }),

  getPackages: (params: GetPackagesParams) =>
    api.get<PackageResponse['getStore']>(`${GATEWAY_CUSTOMER_SERVICE}/packages`, { params }),

  // Package Media
  createPackageMedia: (body: FormData, id: number) =>
    api.post(`${GATEWAY_CUSTOMER_SERVICE}/packages/${id}/media`, body),

  deletePackageMedia: (id: number) =>
    api.delete<unknown>(`${GATEWAY_CUSTOMER_SERVICE}/media/${id}`),

  postPackageDraft: (body: PackageRequest['getPackageDraft']) =>
    api.post<PackageResponse['getPackageDraft']>(
      `${GATEWAY_CUSTOMER_SERVICE}/packages/draft`,
      body,
    ),

  // Subscriptions
  getPackageTree: () =>
    api.get<PackageResponse['getPackageTree']>(`${GATEWAY_CUSTOMER_SERVICE}/packages/tree`),

  getPackageTreeWithStatus: (packageId: number) =>
    api.get<PackageResponse['getPackageTreeWithStatus']>(
      `${GATEWAY_CUSTOMER_SERVICE}/packages/${packageId}/tree`,
    ),

  getPackageTreeWithStatusDetail: (packageId: number) =>
    api.get<PackageResponse['getPackageStore']>(
      `${GATEWAY_CUSTOMER_SERVICE}/packages/${packageId}/detail`,
    ),

  deletePackage: (id: number) =>
    api.delete<PackageResponse['getStore']>(`${GATEWAY_CUSTOMER_SERVICE}/packages/${id}`),

  postPackage: (body: FormData) =>
    api.post<ApiResponseBook>(`${GATEWAY_CUSTOMER_SERVICE}/packages`, body),

  putpackage: (id: number, body: FormData) =>
    api.put<PackageResponse['postPackage']>(`${GATEWAY_CUSTOMER_SERVICE}/packages/${id}`, body),

  downloadPackageList: async (params?: GetPackagesParams) => {
    const { data } = await api.get<Blob>(
      `${GATEWAY_CUSTOMER_SERVICE}/packages/excel?type=saleable`,
      {
        params,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        responseType: 'blob',
      },
    )
    downloadBlob(data, `Lista de paquetes`, 'xlsx')
  },
}
