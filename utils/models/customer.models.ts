export type Customer = {
  institution: Institution
  government: Government
  teacher: Teacher
  parent: Parent
  student: Student
}

// Bases
export type CustomerBase = {
  id: number
  kind: 'government' | 'independent-teacher' | 'parent' | 'independent-student' | 'institution'
  user: User
  displayName: 'Gobierno' | 'Profesor' | 'Padre' | 'Estudiante' | 'Institución'
}

type User = {
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
  identityType: {
    id: number
    name: string
  }
  identityNumber: string
  email: string
  password: string
  avatarUrl?: string
}

export type Organization = {
  organizationKind?: CustomerBase['kind']
  name: string
  educationKind?: {
    id: number
    name: string
    displayName: string
  }
  sector?: {
    id: number
    name: string
    displayName: string
  }
  country: string
  countryId: number
  state: string
  stateId: number
  city: string
  cityId: number
  address: string
  postalCode: string
  phone: string
  identityType?: {
    id: number
    name: string
  }
  identityNumber: string
  logoUrl?: string
  id?: number
}

// Kinds
type Institution = CustomerBase & {
  kind: 'institution'
  organization: Organization
}

type Government = CustomerBase & {
  kind: 'government'
  organization: Organization
}

type Teacher = CustomerBase & {
  kind: 'independent-teacher'
}

type Parent = CustomerBase & {
  kind: 'parent'
  organization: Organization
}

type Student = CustomerBase & {
  kind: 'independent-student'
}

export type CustomerInvoicing = {
  firstName: string
  surname: string
  businessName: string
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
  kind: {
    id: number
    name: string
    displayName: string
  }
}
