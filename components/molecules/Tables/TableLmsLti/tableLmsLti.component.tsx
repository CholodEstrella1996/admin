/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react'

import { Avatar } from '@folcode/clabs.atoms.avatar'
import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import theme from '@folcode/clabs.others.theme-provider'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, TablePagination } from '@mui/material'
import { DataGrid, esES, GridCellParams, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

import { Badge } from 'components/atoms/badge'
import { Dialog } from 'components/atoms/Dialog'
import { SubscriptionForm } from 'components/molecules/forms/newAndEdit/Subscription'

import { DataRow } from './tableLmsLti.model'
import { TableLmsLtiStyle } from './tableLmsLti.styles'

type Props = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number, rowPerPage: number) => void
  totalElements: number
  pageSize?: (rowPerPage: number) => void
  isLoading: boolean
}

const { colors } = theme

const TableLmsLtiComponent = ({
  rows,
  totalElements,
  pageSize = () => {},
  activePage,
  isLoading,
  pageChange = () => {},
}: Props) => {
  const [selected, setSelected] = useState<DataRow>()
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
    if (_item.value !== undefined) return void router.push(`/subscription/${Number(_item.id)}`)
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
    <button type="button" onClick={() => setIsOpenForm(true)} className="tb-desktop-btn__option">
      <EditOutlinedIcon className="editClient_table" />
    </button>
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
      field: 'id',
      headerName: 'ID',
      flex: 0.2,
      disableColumnMenu: true,
    },
    {
      field: 'name',
      headerName: 'Cliente',
      flex: 0.7,
      disableColumnMenu: true,
    },
    {
      field: 'userQuantity',
      headerName: 'Cant. de usuarios',
      flex: 0.6,
      disableColumnMenu: true,
    },
    {
      field: 'numberLicense',
      headerName: 'Número de licencia',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'status',
      headerName: 'Estado',
      flex: 0.7,
      disableColumnMenu: true,
      renderCell: (item: GridRenderCellParams) => <Badge message={item.row.status.displayName} />,
    },
    {
      field: 'support',
      headerName: 'Soporte',
      flex: 0.5,
      disableColumnMenu: true,
      renderCell: (item: GridRenderCellParams) => (
        <Badge message={item.row.support ? 'Si' : 'No'} />
      ),
    },
    {
      field: 'expiration',
      headerName: 'Vencimiento',
      flex: 0.6,
      disableColumnMenu: true,
    },
    {
      field: 'Acciones',
      headerName: '',
      flex: 0.3,
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
        <SubscriptionForm
          isNewForm={false}
          onClose={() => setIsOpenForm(false)}
          idSuscription={selected.id}
          institution
        />
      )}

      {!rows.length && <Dialog message="No se encontraron datos cargados" type="warning" />}
      <style jsx global>
        {TableLmsLtiStyle}
      </style>
    </>
  )
}

export default TableLmsLtiComponent
