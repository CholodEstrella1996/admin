import { Pagination } from 'utils/models/modelsBase'
import {
  GetBilling,
  GetPackages,
  GetSubscription,
  GetSubscriptions,
  Kind,
  Status,
} from 'utils/models/subscriptions.models'

export type SubscriptionsResponse = {
  getSubscriptions: GetSubscriptions
  getSubscription: GetSubscription
  getSubscriptionLmsLti: GetSubscriptionLmsLti
  getBilling: GetBilling
  getPackages: GetPackages
  getKinds: GetKinds
  getSubscriptionKinds: InvoicingKind
  getStatus: GetKinds
  getSubscriptionDraft: GetSubscriptionDraft
  postSubscription: PostSubscription
}

type GetSubscriptionLmsLti = Pagination & {
  content: {
    id: number
    name: string
    email: string
    imageUrl: string
    phone: string
    kind: Kind
    startDate: string
    endDate: string
    status: Status
    customerKind: Kind
    userCount: number
    country: {
      id: number
      name: string
    }
    licenceNumber: string
    installationCount: number
    usedInstallationsCount: number
    devicesPerUser: null
    ltiServerLocation: string
    ltiSupportForAndroid: boolean
    isLtiServerExternal: null
    tokenLTI: string
    licenceId: number
    offlineActivations: number
    allowedAccess: number
    activeInvites: number
    activeMembers: number
  }[]
}

export type InvoicingKind = Kind[]

type GetKinds = Pagination & {
  content: Kind[]
}

type GetSubscriptionDraft = {
  allowedAccess?: number
  userCount?: number
  installationCount: number
  finalPrice: number
  licenceNumber: null
  packagesByType: {
    key: string
    label: string
    contents: {
      id: number
      name: string
      type?: string
    }[]
  }[]
  customer: {
    id: number
    name: string
    kind: Kind
    email: string
    country: string
  }
}

export type Customer = {
  id: number
  name: string
  kind: Kind
  email: string
  country: string
}

export type PostSubscription = {
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
  packagePrice: string
  packageId: number
  customer: Customer
  availableInstallationsCount: number
  usedInstallationsCount: number
  phone: string
  invoicingDataId: number
}

export type SubscriptionKind =
  | 'multiuser-permanent'
  | 'multiuser-temporary'
  | 'monouser-shared'
  | 'monouser-individual'
  | 'demo-individual'
  | 'demo-shared'
  | 'lms-lti'
  | 'classroom-manager'
