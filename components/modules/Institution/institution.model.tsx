import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { ClassroomResponse } from 'services/models/classroom/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'

type ProfileProps = {
  onSearch: () => Promise<void>
  profile: string
  route: string
  pageChange?: (newPage: number) => void
  data: ClassroomResponse['getMembers']
  deleteUser: (id: number) => void
  listStatus: InputSelectOption[]
  isLoading: boolean
  onDownloadExcel?: () => Promise<void>
  isDisabledButton?: boolean
}

type InstitutionProps = {
  role: (rol: string, page: number) => void
  data: ClassroomResponse['getMembers']
  subscriptionData: SubscriptionsResponse['getSubscription']
  deleteUser: (id: number) => void
  onSearch: () => Promise<void>
  listStatus: InputSelectOption[]
  isLoading: boolean
  onDownload?: () => Promise<void>
}

type DataFilter = {
  searchQuery?: string
  status?: InputSelectOption
}

type AddUserProps = {
  id: number
  name: string
  isStudent: boolean
  groupList: InputSelectOption[]
}

type AddUserForm = {
  memberId: number
  roleName: string
  classroomIds: number[]
}

export type { ProfileProps, InstitutionProps, DataFilter, AddUserProps, AddUserForm }
