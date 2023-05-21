import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'

type DataRow = {
  id: number
  installationDate: string
  uuid: string
  serial: string
  vendor: string
}

type TableCustomerProp = {
  rows: DataRow[]
  onDeleteDevice: (id: number) => void
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

type FormFilterProps = {
  searchQuery?: string
  vendor?: InputSelectOption
  pageNumber?: number
  pageSize?: number
}

export type { DataRow, TableCustomerProp as TableCustomProp, FormFilterProps }
