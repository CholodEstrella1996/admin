type DataRow = {
  id: number
  numberBilling: string
  date: string
  total: string
  status: {
    id: number
    name: string
    displayName: string
  }
}

type TableBillingHistoryProp = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number) => void
  totalElements: number
  pageSize: number
  isLoading: boolean
}

export type { DataRow, TableBillingHistoryProp }
