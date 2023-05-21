type DataRow = {
  id: number
  name: string
  iconUrl: string
  description: string
}
type TablePackageProp = {
  rows: DataRow[]
  onDeletePackage: (id: number) => void
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

type FormFilterProps = {
  pageNumber?: number
  pageSize?: number
  type?: string
}
export type { TablePackageProp, DataRow, FormFilterProps }
