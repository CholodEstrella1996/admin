import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'

type DataRow = {
  id: number
  name: string
  avatar: string
  userQuantity: string
  numberLicense: string
  status: {
    id: number
    name: string
    displayName: string
  }
  support: boolean
  expiration: string
}

type TableCustomerProp = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

type FormFilterProps = {
  searchQuery?: string
  pageNumber?: number
  pageSize?: number
  status?: InputSelectOption
  support?: InputSelectOption
}

export type { TableCustomerProp, DataRow, FormFilterProps }
