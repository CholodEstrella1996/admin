/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react'

import DownloadIcon from '@mui/icons-material/Download'
import { Box, TablePagination } from '@mui/material'
import { DataGrid, esES, GridCellParams, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { Badge } from 'components/atoms/badge'
import { Dialog } from 'components/atoms/Dialog'
import { useNotification } from 'utils/hooks/notification'

import { DataRow } from './tableBillingHistory.model'
import { TableBillingHistoryStyle } from './tableBillingHistory.styles'

type Props = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number) => void
  totalElements: number
  pageSize: number
  isLoading: boolean
}
const TableBillingHistoryComponent = ({
  rows,
  totalElements,
  pageSize,
  activePage,
  isLoading,
  pageChange = () => {},
}: Props) => {
  const [, setSelected] = useState<DataRow>()

  const { onError } = useNotification()
  const language = esES

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (!event) return
    pageChange(newPage)
  }

  const handleOnClickRow = (_item: GridCellParams) => {
    setSelected(_item.row as DataRow)
    return null
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

  const dialogMenu = () => (
    <button
      type="button"
      onClick={() => {
        onError('Error al descargar factura')
      }}
      className="tb-desktop-btn__option">
      <DownloadIcon className="deleteClient_table" />
    </button>
  )

  const columns: GridColumns = [
    {
      field: 'idd',
      headerName: '',
      flex: 0.005,
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
    },
    {
      field: 'numberBilling',
      headerName: 'Número de pedido',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'date',
      headerName: 'Fecha',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'status',
      headerAlign: 'center',
      headerName: 'Estado',
      flex: 0.8,
      align: 'center',
      disableColumnMenu: true,
      renderCell: (item: GridRenderCellParams) => <Badge message={item.row.status.name} />,
    },
    {
      field: 'Acciones',
      headerName: '',
      flex: 0.4,
      disableColumnMenu: true,
      sortable: false,
      hideable: false,
      renderCell: () => dialogMenu(),
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

      {!rows.length && <Dialog message="No se encontraron datos cargados" type="warning" />}
      <style jsx global>
        {TableBillingHistoryStyle}
      </style>
    </>
  )
}

export default TableBillingHistoryComponent
