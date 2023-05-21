import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'

type DataRow = {
  id: number
  avatar?: string | null
  name: string
  type?: string
  mail: string
  country: string
  state?: IdNameDisplay
  typeSubscription: string
  expiration: string
}

type IdNameDisplay = {
  id: number
  name: string
  displayName: string
}

type TableSubscriptionProp = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

type FormFilterProps = {
  searchQuery?: string
  kind?: InputSelectOption
  countryId?: InputSelectOption
  pageNumber?: number
  pageSize?: number
  state?: InputSelectOption
  clientKind?: InputSelectOption
}

export type { DataRow, TableSubscriptionProp, FormFilterProps }
