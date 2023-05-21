type DataRow = {
  id: number
  name: string
  avatar?: string
  type?: string
  mail: string
  phone: string
  country: string
  state?: IdNameDisplay
}

type IdNameDisplay = {
  id: number
  name: string
  displayName: string
}

type TableCustomerProp = {
  rows: DataRow[]
  deleteUser: (id: number) => void
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

type SelectOptions = {
  id: number
  name: string
  disabled: boolean
  kind?: string
}

type FormFilterProps = {
  searchQuery?: string
  kind?: string
  countryId?: number
  pageNumber?: number
  pageSize?: number
}

export type { DataRow, TableCustomerProp as TableCustomProp, SelectOptions, FormFilterProps }
