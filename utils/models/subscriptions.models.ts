import { Pagination } from './modelsBase'

export type GetSubscriptions = Pagination & {
  content: {
    id: number
    name: string
    email: string
    imageUrl: string
    kind: Kind
    endDate: Date
    status: Status
    customerKind: Kind
    country: {
      id: number
      name: string
    }
    phone: string
  }[]
}

export type GetSubscription = {
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
  licenceId?: number
  packagePrice: number
  packageId: number
  customer: Customer
  availableInstallationsCount: number
  usedInstallationsCount: number
  phone: string
  invoicingDataId?: number
  accessCount: number
  userCount?: number
  allowedAccess: number
  ltiSupportForAndroid: boolean
  ltiServerLocation: string
  ltiErrorMessage: string
  isLtiServerExternal?: boolean
  serverLocation?: string
  tokenLTI?: string
  activeInvites?: number
  activeMembers?: number
  offlineActivations?: number
}

export type GetBilling = {
  id: number
  businessName: string
  firstName: string
  surname: string
  email: string
  country: {
    id: number
    name: string
  }
  state: {
    id: number
    name: string
  }
  city: {
    id: number
    name: string
  }
  address: string
  postalCode: string
  phoneNumber: string
  identityType: {
    id: number
    name: string
  }
  identityNumber: string
  kind: Kind
}

export type GetPackages = {
  key: string
  label: string
  contents: Content[]
}[]

type Content = {
  id: number
  name: string
  area?: string
}

export type Kind = {
  id: number
  name: string
  displayName: string
}

export type Status = {
  id: number
  name: 'active' | 'suspended' | 'on cancellation' | 'expired' | 'pending' | 'cancelled'
  displayName: 'Activa' | 'Suspendida' | 'En Cancelación' | 'Expirada' | 'Pendiente' | 'Cancelada'
}

export type Customer = {
  id: number
  name: string
  kind: {
    id: number
    name: string
    displayName: string
  }
  email: string
  country: string
  organizationId: number
}
