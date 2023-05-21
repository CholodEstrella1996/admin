import { Pagination } from 'utils/models/modelsBase'

export type User = {
  address: string
  avatarUrl: string
  birthDate?: string
  city: City
  cityId: number
  countryId: number
  createdAt: number
  educationalLevel: IdNameDisplay
  educationalLevelId?: number
  email: string
  emailVerified: boolean
  enabled: boolean
  firstName: string
  gender: IdNameDisplay
  genderId?: number
  id: string
  identityNumber: string
  identityType: IdName
  isCustomer: boolean
  organization: Organization
  phoneNumber: string
  postalCode: string
  requiredActions: string[]
  role: IdNameDisplay[]
  stateId: number
  status: IdNameDisplay
  surname: string
  username: string
}

export type PermissionsRequest = {
  permissions: string[]
}
export type PermissionsResponse = {
  [key: string]: boolean
}

type Organization = {
  id: number
  name: string
  cityId: number
  country: string
  state: string
  city: string
  phoneNumber: string
  address: string
  postalCode: string
  identityType: IdName
  identityNumber: string
  logoUrl: string
  educationKind: IdNameDisplay
  organizationKind: IdNameDisplay
  sector: IdNameDisplay
}

type City = {
  name: string
  stateName: string
  countryName: string
}

export type ResponseIdName = Pagination & {
  content: IdName[]
}

type IdName = {
  id: number
  name: string
}

export type ResponseIdNameDisplay = Pagination & {
  content: IdNameDisplay[]
}

type IdNameDisplay = IdName & {
  displayName: string
}

export type RequiredActions = {
  requiredActions: string[]
}

export type ResponseTermAndConditionList = Pagination & {
  content: {
    id: number
    title: string
    version: string
    active: boolean
  }[]
}

export type ResponseTermsConditions = {
  id: number
  title: string
  version: string
  description: string
  active: boolean
  translations: Translation[]
}

type Translation = {
  id: number
  title: string
  description: string
  language: {
    id: number
    name: string
    languageCode: string
    defaultLanguage: boolean
  }
}
