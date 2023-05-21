import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { GroupsByIdResponse, GroupsListResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { useNotification } from 'utils/hooks/notification'

import { FormDetailsEditorialComponent } from './formDetailsEditorial.component'

type EditorialProps = {
  idEditorial: number
}

export const FormDetailsEditorialContainer = ({ idEditorial }: EditorialProps) => {
  const [dataStore, setDataStore] = useState<GroupsByIdResponse>(Object)
  const [dataBooks, setdataBooks] = useState<GroupsListResponse>(Object)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [postReq, setPostReq] = useState({
    parentId: idEditorial,
    pageNumber: 0,
    pageSize: 10,
  })

  const { onError, onSuccess } = useNotification()
  const router = useRouter()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      parentId: idEditorial,
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }

  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      parentId: idEditorial,
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }

  useEffect(() => {
    const getEditorialApiData = async () => {
      try {
        const [respApiDataStore, resBooks] = await Promise.all([
          groupsService.getGroupsById(idEditorial),
          groupsService.getGroupsList(postReq),
        ])

        setDataStore(respApiDataStore.data)
        setdataBooks(resBooks.data)
      } catch {
        onError('Error al cargar los datos de editoriales')
      }
    }
    void getEditorialApiData()
  }, [idEditorial, onError, postReq])

  const amountLoadedBooks = dataBooks.totalElements
  const subtitleBooks =
    amountLoadedBooks === 1 ? '1 libro cargado' : `${amountLoadedBooks} libros cargados`

  const editorialInfo = [
    {
      id: 1,
      name: 'Nombre de la editorial',
      description: dataStore.name,
    },
  ]

  const deleteBookElement = async (id: number) => {
    try {
      await groupsService.deleteById(id)

      onSuccess('Libro eliminado correctamente')
      void router.push(`/publisher/${idEditorial}`)
      setOpenDialog(false)
    } catch {
      onError('Hubo un error al eliminar libro')
      setOpenDialog(false)
    }
  }

  if (!idEditorial) return null
  return (
    !!dataStore &&
    !!dataBooks.content && (
      <>
        <FormDetailsEditorialComponent
          editorialName={dataStore.name}
          storeEditorial={dataStore}
          informationEditorial={editorialInfo}
          bookData={dataBooks}
          subtitleBooks={subtitleBooks}
          onDeleteBook={(id) => {
            setOpenDialog(true)
            setIdDelete(id)
          }}
          idEditorial={Number(idEditorial)}
          onPageChange={handleChangePage}
          onRowsPaginationChange={handleChangePagination}
        />
        <AlertModal
          titleText="¿Estás seguro de que deseas eliminar el libro?"
          subtitleText="Esta acción no puede deshacerse."
          cancelActionText="Cancelar"
          onCancel={() => setOpenDialog(false)}
          continueActionText="Eliminar"
          onContinue={() => void deleteBookElement(idDelete)}
          open={openDialog}
        />
      </>
    )
  )
}
