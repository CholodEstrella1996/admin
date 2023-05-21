import { OptionProps } from 'components/atoms/inputs/InputSelectMulti/select.models'
import { Pagination } from 'utils/models/modelsBase'
import { RFile } from 'utils/models/reactFormFieldsTabs'

export type MemberRequest = {
  pageNumber?: number
  role: string
  pageSize?: number
  status?: string
  searchQuery?: string
}

export type ResponseMember = Pagination & {
  content: Member[]
}

export type ResponseStatus = Pagination & {
  content: IdNameDisplay[]
}

export type Member = {
  id: number
  role: string
  status: IdNameDisplay
  firstName: string
  surname: string
  email: string
  avatarUrl: string
}

export type IdNameDisplay = IdName & {
  displayName: string
}

export type IdName = {
  id: number
  name: string
}

export type IdentityType = {
  id: number
  name: string
}

export type MemberById = {
  id: number
  role: Role[]
  status: Status
  user: User
}

export type ResponseMemberById = {
  id: number
  role: Role[]
  status: Status
  user: ResponseUser
}

type Role = {
  id: number
  name: string
  displayName: string
}

type Status = {
  id: number
  name: string
  displayName: string
}

export type User = {
  address: string
  avatarContentId: number
  avatarUrl: string | File | RFile[]
  birthDate: string
  cityId: string
  countryId: number | null
  educationalLevel: OptionProps
  email: string
  emailVerified: boolean
  enabled: boolean
  firstName: string
  gender: OptionProps
  id: string
  identityNumber: string
  identityType: OptionProps
  image?: string | File
  isCustomer: boolean
  organizationId: string
  password: string | null
  phoneNumber: string
  postalCode: string
  requiredActions: string[]
  stateId: number | null
  surname: string
}

type ResponseUser = {
  address: string
  avatarContentId: number
  avatarUrl: string | File | RFile[]
  birthDate: string
  cityId: string
  countryId: number | null
  educationalLevel: IdNameDisplay
  educationalLevelId: number
  email: string
  emailVerified: boolean
  enabled: boolean
  firstName: string
  gender: IdNameDisplay
  genderId: number
  id: string
  identityNumber: string
  identityType: IdName
  image?: string | File
  isCustomer: boolean
  organizationId: string
  password: string | null
  phoneNumber: string
  postalCode: string
  requiredActions: string[]
  stateId: number | null
  surname: string
}
