import { CustomerBase } from 'utils/models/customer.models'
import { RFile } from 'utils/models/reactFormFieldsTabs'

export type CustomerRequest = {
  createCustomer: CreateCustomer
  updateCustomer: UpdateCustomer
}

export type InvoicingDataRequest = {
  invoicingDataKind: string
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

// CreateCustomer
type CreateCustomer = {
  data: {
    kind: CustomerBase['kind']
    user: Omit<UserRequest, 'avatarUrl'>
    organization?: OrganizationRequest
  }
  avatar?: RFile[]
  logo?: RFile[]
}

// UpdateCustomer
type UpdateCustomer = {
  data: {
    user: UserRequest
    organization?: OrganizationRequest
  }
  avatar?: RFile[]
  logo?: RFile[]
}

type UserRequest = {
  firstName: string
  secondName?: string | null
  surname: string
  country: string
  countryId: number
  state: string
  stateId: number
  city: string
  cityId: number
  address: string
  postalCode: string
  phone: string
  identityType: string
  identityNumber: string
  email: string
  password: string
  avatarUrl?: string
}

type OrganizationRequest = {
  organizationKind?: CustomerBase['kind']
  name: string
  educationKind?: string
  sector?: string
  country: string
  countryId: number
  state: string
  stateId: number
  city: string
  cityId: number
  address: string
  postalCode: string
  phone: string
  identityType?: string
  identityNumber: string
  logoUrl?: string
  id?: number
}
