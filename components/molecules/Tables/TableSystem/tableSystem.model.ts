type DataRow = {
  id: number
  title: string
  description: string
  version: string
  active: boolean
}
type TableSystemProp = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}
type FormFilterProps = {
  type?: string
  pageNumber?: number
  pageSize?: number
}
export type { TableSystemProp, DataRow, FormFilterProps }
