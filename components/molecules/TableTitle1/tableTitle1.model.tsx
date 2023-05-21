import React from 'react'

import { Section } from 'components/modules/FormDetailsEditorialBook/formDetailEditorialBook.model'

export type TableProps = {
  title?: string
  subtitle?: string
  emptyContent?: string
  buttonText?: string
  activePage?: number
  onClick?: React.MouseEventHandler
  content?: Section
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onDetails?: (id: number) => void
  pageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  rowsPaginationChange?: (rowsPerPage: number) => void
  columns: readonly Column[]
  colorArea?: string
}

type Column = {
  id: string
  label: string
  width?: string | number
  align?: 'right' | 'left' | 'center'
  format?: (value: number) => string
}
