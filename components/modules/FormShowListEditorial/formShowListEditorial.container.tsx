/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import FormNewEditEditorial from 'components/molecules/FormNewEditEditorial'
import { GroupsListResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { useNotification } from 'utils/hooks/notification'

import FormShowListEditorial from './formShowListEditorial.component'

export const FormShowListEditorialContainer = () => {
  const [isOpenEditorial, setIsOpenEditorial] = useState(false)
  const [openNewForm, setOpenNewForm] = useState(false)
  const [idEditorial, setIdEditorial] = useState<number>()
  const [dataEditorial, setDataEditorial] = useState<GroupsListResponse>()
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [postReq, setPostReq] = useState({
    pageNumber: 0,
    pageSize: 10,
  })

  const { onError, onSuccess } = useNotification()
  const router = useRouter()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }
  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }

  useEffect(() => {
    const getEditorialApiData = async () => {
      try {
        const respApiEditorial = await groupsService.getGroupsList({
          kind: 'publisher',
          ...postReq,
        })
        setDataEditorial(respApiEditorial.data)
      } catch {
        onError('Error al cargar los datos de editoriales')
      }
    }
    void getEditorialApiData()
  }, [postReq])

  const amountEditorialsLoaded =
    dataEditorial !== undefined && dataEditorial.content ? dataEditorial.totalElements : 0
  const subtitle =
    amountEditorialsLoaded === 1
      ? '1 editorial cargada'
      : `${amountEditorialsLoaded} editoriales cargadas`

  const handleDeleteEditorial = async (id: number) => {
    try {
      await groupsService.deleteById(id)
      onSuccess(`Editorial eliminada correctamente`)
      setOpenDialog(false)
      void router.push(`/publisher`)
    } catch {
      onError(`Hubo un error al eliminar editorial`)
      setOpenDialog(false)
    }
  }

  return (
    <>
      <FormShowListEditorial
        title="Editoriales"
        subtitle={subtitle}
        buttonText="Agregar nueva editorial"
        onClick={() => {
          setIsOpenEditorial(true)
          setOpenNewForm(true)
        }}
        onEdit={(id) => {
          setIsOpenEditorial(true)
          setOpenNewForm(false)
          setIdEditorial(id)
        }}
        onDelete={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        content={dataEditorial}
        columns={[
          { id: 'iconUrl', label: '', width: '5%' },
          { id: 'name', label: 'Nombre', width: '85%' },
        ]}
        onDetails={(id: number) => {
          void router.push(`/publisher/${id}`)
        }}
        pageChange={handleChangePage}
        rowsPaginationChange={handleChangePagination}
      />
      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar el país?"
        subtitleText="Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void handleDeleteEditorial(idDelete)}
        open={openDialog}
      />

      {isOpenEditorial && (
        <FormNewEditEditorial
          isNewForm={openNewForm}
          idEditorial={idEditorial}
          onClose={() => setIsOpenEditorial(false)}
        />
      )}
    </>
  )
}
