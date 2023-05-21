import { GATEWAY_CUSTOMER_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { DevicesResponse } from 'services/models/devices/response.model'
import { downloadBlob } from 'utils/helpers/downloadBlob'

export type DevicesParams = {
  pageSize?: number
  pageNumber?: number
  searchQuery?: string
  vendor?: string
}

export const devicesService = {
  getDevices: (id: number, params: DevicesParams) =>
    api.get<DevicesResponse['getDevices']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}/devices`,
      {
        params,
      },
    ),

  deleteDevice: (id: number) =>
    api.delete<DevicesResponse['getDevices']>(`${GATEWAY_CUSTOMER_SERVICE}/devices/${id}`),

  getVendor: () =>
    api.get<DevicesResponse['getVendor']>(`${GATEWAY_CUSTOMER_SERVICE}/devices/vendors`),

  downloadDevicesList: async (id: number, params?: DevicesParams) => {
    const { data } = await api.get<Blob>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}/devices/excel`,
      {
        params,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        responseType: 'blob',
      },
    )
    downloadBlob(data, `Lista de dispositivos`, 'xlsx')
  },
}
