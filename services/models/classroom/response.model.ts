import { Pagination } from 'utils/models/modelsBase'
import { Kind } from 'utils/models/subscriptions.models'

export type ClassroomResponse = {
  getSectors: GetSectors
  getEducationKinds: GetEducationKinds
  getIdentity: GetIdentity
  getOrganizations: GetOrganizations
  postInvites: SendInvites
  getLanguages: GetLanguages
  getGroups: GetGroups
  getMembers: GetMembers
  getStatus: GetStatus
}

export type GetOrganizations = {
  id: number
  name: string
  cityId: number
  stateId: number
  countryId: number
  customerId: number
  phoneNumber: string
  address: string
  postalCode?: string
  identityType: string
  identityNumber: string
  logoUrl: string
  educationKind: Kind
  organizationKind: Kind
  sector: Kind
}[]

type GetSectors = Pagination & {
  content: {
    id: number
    name: string
    displayName: string
  }[]
}
type GetEducationKinds = Pagination & {
  content: {
    id: number
    name: string
    displayName: string
  }[]
}

type GetIdentity = Pagination & {
  content: {
    id: number
    name: string
  }[]
}

type GetLanguages = Pagination & {
  content: {
    id: number
    name: string
    languageCode: string
    defaultLanguage: boolean
  }[]
}

type SendInvites = Pagination & {
  content: {
    member: Member
    problem: Problem
    success: boolean
  }[]
}

type Member = {
  email: string
  enabled: boolean
  firstName: string
  id: number
  organizationId: number
  role: Role[]
  status: {
    id: number
    name: string
    displayName: string
  }
  surname: string
  userId: string
}

export type GetMembers = Pagination & {
  content: Content[]
}

export type GetStatus = Pagination & {
  content: ContentStatus[]
}

type Role = {
  id: number
  name: string
  displayName: string
}

type Problem = {
  detail: string
  message: string
  title: string
}

type GetGroups = Pagination & {
  content: {
    id: number
    name: string
    description?: string
  }[]
}

type Status = {
  id: number
  name: string
  displayName: string
}

type Content = {
  id: number
  avatarUrl: string
  role: Role[]
  status: Status
  firstName?: string
  surname?: string
  email: string
  enabled?: boolean
  organizationId?: number
  userId: string
}

type ContentStatus = {
  id: 1
  name: 'invited' | 'active'
  displayName: 'invitado' | 'registrado'
}
