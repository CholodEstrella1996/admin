type DataRow = {
  id: number
  name: string
  email: string
  status: IdNameDisplay
  avatarUrl?: string | null
}

type IdNameDisplay = {
  id: number
  name: string
  displayName: string
}

type TableDataInstitutionProp = {
  rows: DataRow[]
  deleteUser: (id: number) => void
  activePage: number
  pageChange?: (newPage: number) => void
  totalElements: number
  pageSize: number
  profile: string
  isLoading: boolean
}

type TableInstitutionProps = TableDataInstitutionProp & {
  onSubmit: () => Promise<void>
}

export type { DataRow, TableDataInstitutionProp, TableInstitutionProps }
