type DataRow = {
  announcement: string
  message: string
  startDate: string
  recipeint: string
}
type TableAnnouncementProp = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number) => void
  totalElements: number
  pageSize: number
  isLoading: boolean
}
type FormFilterProps = {
  searchQuery?: string
  recipient?: string
  pageNumber?: number
  pageSize?: number
}
export type { TableAnnouncementProp, DataRow, FormFilterProps }
