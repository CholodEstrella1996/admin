import { Pagination } from 'utils/models/modelsBase'
export type DevicesResponse = {
  getDevices: GetDevices
  getVendor: GetVendor
}

export type GetDevices = Pagination & {
  content: {
    id: number
    installationDate: string
    uuid: string
    serialNumber: string
    vendor: string
  }[]
}
export type GetVendor = Pagination & {
  content: {
    id: number
    name: string
  }[]
}
