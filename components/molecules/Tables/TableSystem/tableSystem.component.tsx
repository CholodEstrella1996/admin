/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, TablePagination } from '@mui/material'
import { DataGrid, esES, GridCellParams, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { Controller, useFormContext } from 'react-hook-form'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { Dialog } from 'components/atoms/Dialog'
import { RadioComponent } from 'components/atoms/inputs/InputRadio/radio.component'
import { SystemForm } from 'components/molecules/forms/newAndEdit/Systems'

import { DataRow } from './tableSystem.model'
import { TableSystemStyle } from './tableSystem.styles'

type Props = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

const TableSystemComponent = ({
  rows,
  totalElements,
  pageSize = () => {},
  activePage,
  isLoading,
  pageChange = () => {},
}: Props) => {
  const { control } = useFormContext()

  const [selected, setSelected] = useState<DataRow>()
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [open, setOpen] = useState(false)
  const [openClick, setOpenClick] = useState(false)
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

  const dialogMenu = (_item: GridRenderCellParams) => (
    <>
      <>
        <button
          type="button"
          onClick={() => setIsOpenForm(true)}
          className="tb-desktop-btn__option">
          <EditOutlinedIcon className="editClient_table" />
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(true)
          }}
          className="tb-desktop-btn__option">
          <DeleteOutlineIcon className="deleteClient_table" />
        </button>
      </>

      {_item.row.id === selected?.id && (
        <AlertModal
          titleText={
            _item.row.active
              ? 'No es posible eliminar esta version'
              : '¿Quieres eliminar una versión de Menú Cloudlabs?'
          }
          subtitleText={
            _item.row.active
              ? 'Debes seleccionar otro activo antes de eliminar este'
              : 'Esta acción no puede deshacerse.'
          }
          cancelActionText={_item.row.active ? '' : 'No, cancelar'}
          onCancel={() => {
            setOpen(false)
          }}
          continueActionText={_item.row.active ? 'Entendido' : 'Sí, continuar'}
          onContinue={() => {
            if (selected && !_item.row.active) setOpen(false)
            setSelected(undefined)
          }}
          open={open}
        />
      )}
    </>
  )

  const columns: GridColumns = [
    {
      field: 'title',
      headerName: 'Título',
      flex: 0.5,
      disableColumnMenu: true,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      flex: 0.8,
      disableColumnMenu: true,
    },
    {
      field: 'active',
      headerName: 'Versión activa',
      flex: 0.3,
      align: 'center',
      disableColumnMenu: true,
      renderCell: (item: GridRenderCellParams) => (
        <Controller
          control={control}
          name={item.field}
          render={({ field: { onChange } }) => (
            <>
              <RadioComponent
                name={item.field}
                onChange={() => {
                  setOpenClick(true)
                }}
                value={String(item.row.id)}
                key={item.field}
                checked={item.row.active}
              />

              {item.row.id !== selected?.id && (
                <AlertModal
                  open={openClick}
                  backGroundOpacity
                  titleText="¿Quieres cambiar la versión de Menú Cloudlabs?"
                  subtitleText="La versión seleccionada, será la que se descargue desde la página web."
                  cancelActionText="No, cancelar"
                  onCancel={() => {
                    setOpenClick(false)
                  }}
                  continueActionText="Sí, cambiar"
                  onContinue={() => {
                    if (selected) onChange(selected.id)
                    setOpenClick(false)
                  }}
                />
              )}
            </>
          )}
        />
      ),
    },
    {
      field: 'version',
      headerName: 'Versión',
      flex: 0.5,

      disableColumnMenu: true,
    },
    {
      field: 'Acciones',
      headerName: '',
      flex: 0.4,
      disableColumnMenu: true,
      renderCell: (item: GridRenderCellParams) => dialogMenu(item),
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
      {isOpenForm && selected !== undefined && (
        <SystemForm idSystem={selected.id} onClose={() => setIsOpenForm(false)} isNewForm={false} />
      )}

      {!rows.length && <Dialog message="No se encontraron datos cargados" type="warning" />}
      <style jsx global>
        {TableSystemStyle}
      </style>
    </>
  )
}
export default TableSystemComponent
