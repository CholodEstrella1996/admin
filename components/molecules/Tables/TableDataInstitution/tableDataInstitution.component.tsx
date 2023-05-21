/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react'

import { Avatar } from '@folcode/clabs.atoms.avatar'
import { Typography } from '@folcode/clabs.atoms.typography'
import { AccountCircleOutlined } from '@mui/icons-material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Box, IconButton, TablePagination } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams, GridCellParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

import AlertModal from 'components/atoms/AlertModal'
import { Dialog } from 'components/atoms/Dialog'

import { DataRow } from './tableDataInstitution.model'
import { TableDataDesktopStyle } from './tableDataInstitution.styles'

type Props = {
  rows: DataRow[]
  deleteUser: (id: number) => void
  activePage: number
  pageChange?: (newPage: number) => void
  totalElements: number
  pageSize: number
  isLoading: boolean
}

const TableDataInstitution = ({
  rows,
  deleteUser,
  totalElements,
  pageSize,
  activePage,
  pageChange = () => {},
  isLoading,
}: Props) => {
  const [selected, setSelected] = useState<DataRow>()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (!event) return
    pageChange(newPage)
  }

  const handleOnClickRow = (item: GridCellParams) => {
    setSelected(item.row as DataRow)
    if (item.field === 'option') return null
    if (item.row.status.name !== 'invited') {
      const routerId = router.asPath.split('/', 3)[2].split('-', 1).toString()
      return void router.push(`/customer/${routerId}/members/${Number(item.row.id)}`)
    }

    return null
  }

  const menu = (_item: GridRenderCellParams) => (
    <>
      <IconButton onClick={() => setOpen(true)} className="action__buttons">
        <DeleteOutlinedIcon color="error" />
      </IconButton>

      {_item.row.id === selected?.id && (
        <AlertModal
          titleText="¿Quieres eliminar el usuario?"
          subtitleText={`Si eliminas el usuario: ${
            selected?.email ? selected?.email : ''
          }, no podrás recuperarlo.`}
          cancelActionText="No, cancelar"
          onCancel={() => {
            setOpen(false)
          }}
          continueActionText="Sí, eliminar"
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
      field: 'icon',
      headerName: 'icon',
      headerClassName: 'hide-header-name',
      width: 80,
      disableColumnMenu: true,
      sortable: false,
      align: 'center',
      renderCell: (item: GridRenderCellParams) =>
        item.row?.avatarUrl ? (
          <Avatar image={item.row?.avatarUrl ?? undefined} size="small" name="" />
        ) : (
          <AccountCircleOutlined className="tableDataDesktop__icons--user" />
        ),
    },
    {
      field: 'name',
      headerName: 'Nombre y apellido',
      flex: 1,
      disableColumnMenu: true,
      headerClassName: 'table__header',
    },
    {
      field: 'email',
      headerName: 'Correo electrónico',
      flex: 1,
      disableColumnMenu: true,
      headerClassName: 'table__header',
    },
    {
      field: 'state',
      headerName: 'Estado',
      width: 150,
      flex: 0.5,
      disableColumnMenu: true,
      headerClassName: 'table__header',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (item: GridRenderCellParams) => (
        <div>
          <Typography
            variant="s2"
            className={`tableDataDesktop--chip ${
              item.row.status.name === 'invited'
                ? 'tableDataDesktop--invitado'
                : 'tableDataDesktop--register'
            }`}>
            {item.row.status.displayName}
          </Typography>
        </div>
      ),
    },
    {
      field: 'option',
      headerName: 'options',
      headerClassName: 'hide-header-name actions__menu',
      maxWidth: 60,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: false,
      sortable: false,
      hideable: false,
      filterable: false,
      renderCell: (item: GridRenderCellParams) => menu(item),
    },
  ]

  return (
    <>
      <Box
        sx={{
          height: `${isLoading || rows.length > 0 ? '40rem' : '3.125rem'}`,
          paddingBottom: isLoading || rows.length > 0 ? '3rem' : '0',
          width: '100%',
        }}>
        <DataGrid
          loading={isLoading}
          onCellClick={(item) => handleOnClickRow(item)}
          className={`tableDataDesktop__container `}
          rows={rows}
          columns={columns}
          pageSize={10}
          hideFooter
          disableSelectionOnClick
        />
        {!!rows.length && !isLoading && (
          <TablePagination
            className="tableDataDesktop__container-pagination"
            component="div"
            count={totalElements}
            page={activePage}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[-1]}
          />
        )}
      </Box>
      {!rows.length && !isLoading && <Dialog message="No encontramos resultados" type="warning" />}
      <style jsx global>
        {TableDataDesktopStyle}
      </style>
    </>
  )
}

export default TableDataInstitution
