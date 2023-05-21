import React from 'react'

import { Avatar } from '@folcode/clabs.atoms.avatar'
import { Typography } from '@folcode/clabs.atoms.typography'
import { Pagination } from '@folcode/clabs.molecules.pagination'
import theme from '@folcode/clabs.others.theme-provider'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import Image from 'next/image'

import { useTreeMenuContext } from 'utils/contexts/treeMenu.context'
import useTreeMenu from 'utils/hooks/useTreeMenu'

import { TableProps } from '../TableTitle1/tableTitle1.model'
import BasicTableStyles from './basicTable.styles'

const { colors } = theme

const BasicTableComponent = ({
  content,
  emptyContent = 'No existen datos cargados',
  onEdit = (id: number) => id,
  onDelete = (id: number) => id,
  onDetails = (id: number) => id,
  pageChange,
  rowsPaginationChange,
  columns,
  colorArea,
}: TableProps) => {
  const { refreshTreeData } = useTreeMenu()
  const { treeMenuData } = useTreeMenuContext()

  const handleDelete = (rowId: number) => {
    const prevTreeMenuData = JSON.stringify(treeMenuData)

    onDelete(rowId)

    void refreshTreeData(prevTreeMenuData)
  }
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
        {content?.content.length ? (
          <TableContainer sx={{ maxHeight: '100%', border: 'none' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ width: column?.width, border: 'none' }}>
                      <Typography variant="s1" color={colors.neutrals[400]}>
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {content?.content.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}>
                    {columns?.map((column) => {
                      const value = row[column.id as keyof typeof row]
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => onDetails(row.id)}>
                          {column.id === 'iconUrl' && !!column.id ? (
                            <Avatar
                              name={row.name}
                              size="small"
                              color={row.color ?? colorArea}
                              className="icon"
                              icon={
                                <Image
                                  src={
                                    row.iconUrl ??
                                    'https://s3-cloudlabas-dev.s3.amazonaws.com/public/image/file_1655142682086.webp'
                                  }
                                  width="50"
                                  height="50"
                                  alt={row.name}
                                  placeholder="blur"
                                  blurDataURL={
                                    row.iconUrl ??
                                    'https://s3-cloudlabas-dev.s3.amazonaws.com/public/image/file_1655142682086.webp'
                                  }
                                  layout="responsive"
                                />
                              }
                            />
                          ) : (
                            <Typography variant="s2" color={colors.neutrals[400]}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </Typography>
                          )}
                        </TableCell>
                      )
                    })}
                    <TableCell>
                      <div className="align__icons">
                        <Tooltip title="Editar">
                          <IconButton onClick={() => onEdit(row.id)}>
                            <EditOutlinedIcon color="action" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton onClick={() => handleDelete(row.id)}>
                            <DeleteOutlinedIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="pagination">
              <Pagination
                totalPages={content?.totalElements}
                activePage={content?.pageable.pageNumber}
                countPerPage={content?.size}
                pageChange={pageChange}
                rowsPaginationChange={rowsPaginationChange}
                label="Filas por páginas"
              />
            </div>
          </TableContainer>
        ) : (
          <Typography variant="s1" className="empty__table" color={colors.neutrals[400]}>
            {emptyContent}
          </Typography>
        )}
      </Paper>

      <style jsx>{BasicTableStyles}</style>
      <style jsx global>{`
        .icon .avatar__icon {
          display: block;
        }
      `}</style>
    </>
  )
}

export default BasicTableComponent
