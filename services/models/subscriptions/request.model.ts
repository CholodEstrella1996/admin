import { Status } from 'utils/models/subscriptions.models'

export type SubscriptionRequest = {
  getSubscriptionDraft: GetSubscriptionDraft
  postSubscription: PostSubscription
}

// Endpoints
type GetSubscriptionDraft = {
  kind: string
  installationCount: number
  startDate: string
  endDate: string | null
  status: string
  userCount?: number
  allowedAccess?: number
  packageIds: number[]
  customerId: number
  invoicingData: {
    kind: string
    businessName: string
    email: string
    cityId: number
    address: string
    postalCode: string
    phoneNumber: string
    identityType: string
    identityNumber: string
  }
}
type PostSubscription = {
  kind: string
  installationCount: number
  startDate: string
  endDate: string | null
  status: string | Status['name']
  finalPrice: number
  packageIds: number[]
  customerId: number
  accessCount?: number
  userCount?: number
  allowedAccess?: number
  isLtiServerExternal?: boolean
  regionServer?: string
  ltiSupportForAndroid?: boolean
  invoicingData: {
    firstName: string
    surname: string
    email: string
    country: string
    status: string
    cityId: number
    address: string
    postalCode: string
    phoneNumber: string
    identityType: string
    identityNumber: string
    businessName: string
    kind: string
  }
}

export type CreateSuscription = {
  customerId: number
  kind: string
  offlineActivations: number
  allowedAccess: number
  licenceId: number
  startDate: string
  expiration?: string
  status: string
}
