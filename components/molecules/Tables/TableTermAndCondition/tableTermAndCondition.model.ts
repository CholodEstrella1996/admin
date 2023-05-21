type DataRow = {
  id: number
  avatar?: string | null
  title: string
  version: string
  active: boolean
}

type TableTermAndConditionProp = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number) => void
  deleteTermAndCondition: (id: number) => void
  totalElements: number
  pageSize: number
  isLoading: boolean
}

export type { DataRow, TableTermAndConditionProp }
