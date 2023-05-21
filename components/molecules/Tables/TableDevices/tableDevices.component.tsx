/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, TablePagination } from '@mui/material'
import { DataGrid, esES, GridCellParams, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { Dialog } from 'components/atoms/Dialog'

import { DataRow } from './tableDevices.model'
import { TableDevicesStyle } from './tableDevices.styles'

type Props = {
  rows: DataRow[]
  onDeleteDevice: (id: number) => void
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

const TableDevicesComponent = ({
  rows,
  onDeleteDevice,
  totalElements,
  pageSize = () => {},
  activePage,
  isLoading,
  pageChange = () => {},
}: Props) => {
  const [selected, setSelected] = useState<DataRow>()
  const [open, setOpen] = useState(false)
  const language = esES

  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return
    pageSize(+event.target.value)
    setRowsPerPage(+event.target.value)
    pageChange(0, +event.target.value)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (!event) return

    pageChange(newPage, rowsPerPage)
  }

  const handleOnClickRow = (_item: GridCellParams) => {
    setSelected(_item.row as DataRow)
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

  const dialogMenu = (_item: GridRenderCellParams) => (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
        }}
        className="tb-desktop-btn__option">
        <DeleteOutlineIcon className="deleteClient_table" />
      </button>

      {_item.row.id === selected?.id && (
        <AlertModal
          titleText="¿Quieres eliminar el dispositivo?"
          subtitleText="El cliente no podrá acceder desde este dispositivo."
          cancelActionText="No, volver"
          onCancel={() => {
            setOpen(false)
          }}
          continueActionText="Sí, eliminar"
          onContinue={() => {
            if (selected) onDeleteDevice(selected?.id)
            setOpen(false)
            setSelected(undefined)
          }}
          open={open}
        />
      )}
    </>
  )

  const columns: GridColumns = [
    {
      field: 'Opciones',
      headerName: '',
      maxWidth: 110,
      flex: 0.001,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: false,
      sortable: false,
      hideable: false,
    },
    {
      field: 'id',
      headerName: 'ID Dispositivo',
      flex: 1,
      disableColumnMenu: true,
      maxWidth: 140,
    },
    {
      field: 'installationDate',
      headerName: 'Fecha de instalación',
      flex: 1,
      maxWidth: 200,
      disableColumnMenu: true,
    },
    {
      field: 'uuid',
      headerName: 'UUID',
      flex: 1,

      disableColumnMenu: true,
    },
    {
      field: 'serial',
      headerName: 'Serial',
      flex: 1,

      disableColumnMenu: true,
    },
    {
      field: 'vendor',
      headerName: 'Fabricante',
      flex: 1,
      maxWidth: 120,
      disableColumnMenu: true,
    },
    {
      field: 'Acciones',
      headerName: '',
      flex: 0.6,
      maxWidth: 80,
      disableColumnMenu: true,
      sortable: false,
      hideable: false,
      renderCell: (item: GridRenderCellParams) => dialogMenu(item),
    },
  ]

  return (
    <>
      <Box
        className="tb-desktop-table"
        sx={{
          height: rows.length > 0 ? '40rem' : '3.125rem',
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
          pageSize={rowsPerPage}
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
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 100]}
            labelRowsPerPage="Filas por páginas"
          />
        )}
      </Box>

      {!rows.length && <Dialog message="No se encontraron dispositivos cargados" type="warning" />}
      <style jsx global>
        {TableDevicesStyle}
      </style>
    </>
  )
}

export default TableDevicesComponent
