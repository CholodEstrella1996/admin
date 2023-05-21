import { GroupsByIdResponse } from 'services/models/groups.model'
import { Section } from 'services/models/section.model'

export type DetailEditorialProps = {
  idEditorial: number
  editorialName?: string
  storeEditorial: GroupsByIdResponse
  informationEditorial: Content[]
  bookData: Section
  subtitleBooks: string
  onDeleteBook: (id: number) => void
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  onRowsPaginationChange?: (rowsPerPage: number) => void
}

export type EditorialStore = {
  visible: boolean
  iconUrl: string
}

export type DataEditorialStore = {
  id: number
  name: string
  visible: boolean
  iconUrl: string
  description: string
  kind: string
}

type Content = {
  id: number
  name: string
  description: string
}
