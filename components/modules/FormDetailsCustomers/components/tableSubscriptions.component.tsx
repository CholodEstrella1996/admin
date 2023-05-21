/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import theme from '@folcode/clabs.others.theme-provider'
import { Box, TablePagination } from '@mui/material'
import { DataGrid, esES, GridCellParams, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

import { Badge } from 'components/atoms/badge'
import { Dialog } from 'components/atoms/Dialog'
import { TableSuscriptionsStyle } from 'components/molecules/Tables/TableSubscriptions/tableSubscriptions.styles'
import { Status } from 'utils/models/subscriptions.models'

export type DataRow = {
  id: string
  code?: string | null
  type?: string | null
  endDate?: string | null
  state?: Status
}

type Props = {
  rows: DataRow[]
  activePage: number
  pageChange?: (newPage: number) => void
  totalElements: number
  pageSize: number
}
const language = esES
const { colors } = theme

const TableSubscriptions = ({
  rows,
  totalElements,
  pageSize,
  activePage,
  pageChange = () => {},
}: Props) => {
  const router = useRouter()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (!event) return
    pageChange(newPage)
  }

  const handleOnClickRow = (_item: GridCellParams) => {
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

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 0.5,
      disableColumnMenu: true,
      maxWidth: 120,
    },
    {
      field: 'code',
      headerName: 'Suscripción',
      maxWidth: 240,
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      sortable: false,
      hideable: false,
      renderCell: (item: GridRenderCellParams) =>
        item.row?.code ? (
          <TextIcon
            className="avatar__textIcon"
            text=""
            id={item.row.code ?? undefined}
            size="small"
            colorAvatar={colors.primary[500]}
          />
        ) : null,
    },

    {
      field: 'type',
      headerName: 'Tipo',
      flex: 1,
      disableColumnMenu: true,
      maxWidth: 240,
    },
    {
      field: 'endDate',
      headerName: 'Vencimiento',
      flex: 1,
      maxWidth: 240,
      disableColumnMenu: true,
    },
    {
      field: 'state',
      headerName: 'Estado',
      flex: 1,
      maxWidth: 220,

      disableColumnMenu: true,
      renderCell: (item: GridRenderCellParams) => <Badge message={item.row.state.displayName} />,
    },
  ]

  return (
    <>
      <Box
        className="tb-desktop-table"
        sx={{
          height: rows.length > 0 ? '20rem' : '3.125rem',
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
        {TableSuscriptionsStyle}
      </style>
    </>
  )
}

export default TableSubscriptions
