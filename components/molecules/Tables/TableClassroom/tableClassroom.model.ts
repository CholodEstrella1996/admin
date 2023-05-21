type DataRow = {
  id?: number
  name: string
  avatar: string
  numberLicense: string
  offlineActivations: number
  allowedAccess: number
  startDate: string
  expiration: string
  status: {
    id: number
    name: string
    displayName: string
  }
}

type TableClassroomProp = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number) => void
  totalElements: number
  pageSize: number
  isLoading: boolean
}
type FormFilterProps = {
  searchQuery?: string
  pageNumber?: number
  pageSize?: number
}
export type { TableClassroomProp, DataRow, FormFilterProps }
