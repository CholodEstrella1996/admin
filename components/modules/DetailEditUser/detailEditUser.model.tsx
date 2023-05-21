import { OptionProps } from 'components/atoms/inputs/InputSelectMulti/select.models'
import { ResponseMemberById } from 'services/models/member.model'
import { RFile } from 'utils/models/reactFormFieldsTabs'

export type NavigationProps = {
  id: number
  email: string
  isEditable?: boolean
  onDelete: () => void
  onSubmit: () => Promise<void>
  isSaving?: boolean
}

export type MemberProps = {
  member: ResponseMemberById
  onDelete: () => void
  onSubmit: () => Promise<void>
  setIsEditable: (edit: boolean) => void
  isEditable?: boolean
  isSaving?: boolean
  identityOptions: OptionProps[]
  genderOptions: OptionProps[]
  educationLevelOptions: OptionProps[]
}

export type MemberInputForm = {
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
