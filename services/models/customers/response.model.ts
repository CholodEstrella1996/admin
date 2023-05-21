import { Customer, CustomerBase, CustomerInvoicing } from 'utils/models/customer.models'
import { Pagination } from 'utils/models/modelsBase'
import { Kind, Status } from 'utils/models/subscriptions.models'

export type CustomerResponse = {
  getCustomers: GetCustomers
  getKinds: GetKinds
  getLanguages: GetLanguages
  getStatus: GetStatus
  getIdentity: GetIdentity
  getCustomerList: GetCustomerList
  getCustomerInvoicing: CustomerInvoicing
  getCustomer: GetCustomer
  getCustomerSuscription: GetCustomerSuscription
  getCustomerSuscriptionClassRoom: GetCustomerSuscriptionClassRoom
  getCustomerListClassroom: GetCustomerList
  getPackageDetail: GetPackageDetail
  createCustomer: CreateCustomer
  updateCustomer: UpdateCustomer
  deleteCustomer: DeleteCustomer
  PostSubscriptionClassRoom: PostSubscriptionClassRoom
}

export type AnyCustomer =
  | Customer['government']
  | Customer['institution']
  | Customer['parent']
  | Customer['student']
  | Customer['teacher']

type GetCustomers = Pagination & {
  content: AnyCustomer[]
}
type CreateCustomer = AnyCustomer
type GetCustomer = AnyCustomer
type UpdateCustomer = AnyCustomer
type DeleteCustomer = AnyCustomer
type GetLanguages = Pagination & { content: Language[] }
type GetKinds = Pagination & {
  content: {
    id: number
    name: CustomerBase['kind']
    displayName: string
  }[]
}
type GetIdentity = Pagination & {
  content: {
    id: number
    name: string
  }[]
}
type GetCustomerList = Pagination & {
  content: {
    id: number
    kind: {
      id: number
      name: string
      displayName: string
    }
    name: string
    email: string
  }[]
}

type GetCustomerSuscription = Pagination & {
  content: {
    id: number
    kind: {
      id: number
      name: string
      displayName: string
    }
    code: string
    endDate: string
    status: Status
  }[]
}

type GetCustomerSuscriptionClassRoom = Pagination & {
  content: {
    id: number
    licenceNumber: string
  }[]
}
type GetStatus = Pagination & {
  content: {
    id: number
    name: string
    displayName: string
  }[]
}

type GetPackageDetail = {
  id: number
  name: string
  description: string
  visible: boolean
  type?: string
  price: number
  icon: {
    id: number
    name: string
    url: string
    kind: string
    format: {
      extension: string
      contentType: string
    }
  }
  media?: string
  translations: Translation[]
}

export type Translation = {
  id: number
  name: string
  description: string
  keywords?: string[]
  language: Language
}

export type Language = {
  id: number
  name: string
  languageCode: string
  defaultLanguage: boolean
}

export type PostSubscriptionClassRoom = {
  id: number
  kind: Kind
  installationCount: number
  startDate: string
  endDate: string
  dayCount: number
  status: Status
  licenceNumber: string
  paymentPeriodicity?: string
  lastPayment?: string
  nextPayment?: string
  licenceId?: string
  packagePrice: string
  packageId: number
  customer: Kind
  availableInstallationsCount: number
  usedInstallationsCount: number
  phone: string
  invoicingDataId: number
}
