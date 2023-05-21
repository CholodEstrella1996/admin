/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react'

import { Avatar } from '@folcode/clabs.atoms.avatar'
import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import theme from '@folcode/clabs.others.theme-provider'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, TablePagination } from '@mui/material'
import { DataGrid, GridCellParams, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import router from 'next/router'

import AlertModal from 'components/atoms/AlertModal'
import { Dialog } from 'components/atoms/Dialog'
import { PackageForm } from 'components/molecules/forms/newAndEdit/Packages'

import { DataRow } from './tablePackage.model'
import { TablePackageStyle } from './tablePackage.styles'

type Props = {
  rows: DataRow[]
  onDeletePackage: (id: number) => void
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

const { colors } = theme

const TablePackageComponent = ({
  rows,
  onDeletePackage,
  totalElements,
  pageSize = () => {},
  activePage,
  isLoading,
  pageChange = () => {},
}: Props) => {
  const [selected, setSelected] = useState<DataRow>()
  const [open, setOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)

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
    if (_item.value !== undefined) return void router.push(`package/${_item.id}`)
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
      <button
        type="button"
        onClick={() => {
          setIsOpenEdit(true)
        }}
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

      {_item.row.id === selected?.id && (
        <AlertModal
          titleText="¿Quieres eliminar el paquete?"
          subtitleText="Si eliminas el paquete, desaparecerá del Store, como así también de las suscripciones de los clientes que lo hayan adquirido."
          cancelActionText="No, volver"
          onCancel={() => {
            setOpen(false)
          }}
          continueActionText="Sí, eliminar"
          onContinue={() => {
            if (selected) onDeletePackage(selected?.id)
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
      field: 'iconUrl',
      headerName: '',
      maxWidth: 110,
      flex: 0.001,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: false,
      sortable: false,
      hideable: false,
      renderCell: (item: GridRenderCellParams) =>
        item.row?.iconUrl ? (
          <Avatar image={item.row?.iconUrl ?? undefined} name="a" size="small" />
        ) : (
          <TextIcon
            className="avatar__textIcon"
            text=""
            id={item.row?.name}
            size="small"
            colorAvatar={colors.primary[500]}
            icon={item.row?.iconUrl}
          />
        ),
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 0.8,
      disableColumnMenu: true,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      flex: 1,
      disableColumnMenu: true,
    },

    {
      field: 'Acciones',
      headerName: '',
      flex: 0.3,
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
      {isOpenEdit && selected !== undefined && (
        <PackageForm
          isNewForm={false}
          onClose={() => setIsOpenEdit(false)}
          idPackage={selected.id}
        />
      )}

      {!rows.length && <Dialog message="No se encontraron datos cargados" type="warning" />}

      <style jsx global>
        {TablePackageStyle}
      </style>
    </>
  )
}
export default TablePackageComponent
