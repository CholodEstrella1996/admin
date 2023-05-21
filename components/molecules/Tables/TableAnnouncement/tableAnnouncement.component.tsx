import { useState } from 'react'

import { Box, TablePagination } from '@mui/material'
import { DataGrid, esES, GridCellParams, GridColumns } from '@mui/x-data-grid'

import { Dialog } from 'components/atoms/Dialog'
import { AnnouncementDetali } from 'components/molecules/Announcement/AnnouncementDetali'

import { DataRow } from './tableAnnouncement.model'
import { TableClassroomStyle } from './tableAnnouncement.styles'

type Props = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number) => void
  totalElements: number
  pageSize: number
  isLoading: boolean
}

const TableAnnouncementComponent = ({
  rows,
  totalElements,
  pageSize,
  activePage,
  isLoading,
  pageChange = () => {},
}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [selected, setSelected] = useState<DataRow>()
  const language = esES

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (!event) return
    pageChange(newPage)
  }
  const handleOnClickRow = (_item: GridCellParams) => {
    setSelected(_item.row as DataRow)
    setIsOpenForm(true)
  }

  const dataGridStyles = {
    '& .MuiDataGrid-columnSeparator': {
      visibility: 'hidden',
    },
    '& .MuiDataGrid-menuIcon': {
      visibility: 'visible',
      width: 'auto',
    },
    '& .MuiDataGrid-cell--textLeft': {
      cursor: 'pointer',
    },
    '& .MuiDataGrid-cell:focus-within': {
      outline: 'none',
    },
    '& .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-columnHeader:focus-within': {
      outline: 'none',
    },
    '& .MuiDataGrid-columnHeader:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: '600',
    },
  }

  const dataGridPanelStyles = {
    '& .MuiDataGrid-panelHeader': {
      display: 'none',
    },
    '& .MuiDataGrid-paper': {
      border: '3px solid #3C50B5',
      borderRadius: '1rem',
    },
  }

  const columns: GridColumns = [
    {
      field: 'announcement',
      headerName: 'Anuncio',
      flex: 0.8,
      disableColumnMenu: true,
    },
    {
      field: 'message',
      headerName: 'Mensaje',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'startDate',
      headerName: 'Fecha de envío',
      flex: 0.5,
      disableColumnMenu: true,
    },
    {
      field: 'recipeint',
      headerName: 'Destinatario',
      flex: 0.6,
      disableColumnMenu: true,
    },
  ]
  return (
    <>
      <Box
        className="tb-desktop-table"
        sx={{
          height: `${rows.length > 0 ? '40rem' : '3.125rem'}`,
          paddingBottom: rows.length > 0 ? '3rem' : '0',
          width: '100%',
        }}>
        <DataGrid
          sx={dataGridStyles}
          componentsProps={{
            panel: {
              sx: dataGridPanelStyles,
            },
          }}
          onCellClick={(item) => handleOnClickRow(item)}
          className="tb-desktop-tableData"
          rows={rows}
          columns={columns}
          pageSize={10}
          hideFooter
          disableSelectionOnClick
          localeText={language.components.MuiDataGrid.defaultProps.localeText}
          loading={isLoading}
        />

        {!!rows.length && (
          <TablePagination
            className="tb-desktop-tableData-pagination"
            component="div"
            count={totalElements}
            page={activePage}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[-1]}
          />
        )}
      </Box>

      {isOpenForm && selected !== undefined && (
        <AnnouncementDetali isNewForm={false} onClose={() => setIsOpenForm(false)} />
      )}

      {!rows.length && <Dialog message="No se encontraron datos cargados" type="warning" />}

      <style jsx global>
        {TableClassroomStyle}
      </style>
    </>
  )
}
export default TableAnnouncementComponent
