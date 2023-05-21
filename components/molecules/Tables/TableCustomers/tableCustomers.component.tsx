/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react'

import { Avatar } from '@folcode/clabs.atoms.avatar'
import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import theme from '@folcode/clabs.others.theme-provider'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, TablePagination } from '@mui/material'
import { DataGrid, esES, GridCellParams, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { Dialog } from 'components/atoms/Dialog'
import { CustomerForm } from 'components/molecules/FormNewEditCustomers'

import { DataRow } from './tableCustomers.model'
import { TableCustomerStyle } from './tableCustomers.styles'

type Props = {
  rows: DataRow[]
  deleteUser: (id: number) => void
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}
const { colors } = theme

const TableCustomersComponent = ({
  rows,
  deleteUser,
  totalElements,
  pageSize = () => {},
  activePage,
  isLoading,
  pageChange = () => {},
}: Props) => {
  const [selected, setSelected] = useState<DataRow>()
  const [open, setOpen] = useState<boolean>(false)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const language = esES
  const router = useRouter()
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
    if (_item.value !== undefined) return void router.push(`/customer/${Number(_item.id)}`)
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
          titleText="¿Quieres eliminar el cliente?"
          subtitleText={`Si eliminas el cliente: ${
            selected?.mail ? selected?.mail : ''
          }, no podrás recuperarlo.`}
          cancelActionText="No, cancelar"
          onCancel={() => {
            setOpen(false)
          }}
          continueActionText="Sí, continuar"
          onContinue={() => {
            if (selected) deleteUser(selected?.id)
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
      field: 'Avatar',
      headerName: '',
      maxWidth: 110,
      flex: 0.001,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: false,
      sortable: false,
      hideable: false,
      renderCell: (item: GridRenderCellParams) =>
        item.row?.avatar ? (
          <Avatar image={item.row?.avatar ?? undefined} name="a" size="small" />
        ) : (
          <TextIcon
            className="avatar__textIcon"
            text=""
            id={item.row?.name}
            size="small"
            colorAvatar={colors.primary[500]}
            icon={item.row?.avatar}
          />
        ),
    },
    {
      field: 'name',
      headerName: 'Nombre del cliente',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'type',
      headerName: 'Tipo de cliente',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'mail',
      headerName: 'Correo electrónico',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'country',
      headerName: 'País',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'Acciones',
      headerName: '',
      flex: 0.6,
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
        <CustomerForm
          isNewForm={false}
          onClose={() => setIsOpenForm(false)}
          idCustomer={selected.id}
        />
      )}

      {!rows.length && <Dialog message="No se encontraron datos cargados" type="warning" />}
      <style jsx global>
        {TableCustomerStyle}
      </style>
    </>
  )
}

export default TableCustomersComponent
