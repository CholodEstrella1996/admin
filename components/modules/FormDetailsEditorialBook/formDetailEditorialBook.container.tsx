/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { GroupsByIdResponse, GroupsListResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { useNotification } from 'utils/hooks/notification'

import FormDetailEditorialBookComponent from './formDetailEditorialBook.component'

type Props = {
  idBook: number
  idEditorial?: number
}

const FormDetailEditorialBook = ({ idBook, idEditorial }: Props) => {
  const [dataBook, setDataBook] = useState<GroupsByIdResponse>()
  const [dataThemes, setDataThemes] = useState<GroupsListResponse>()
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [postReq, setPostReq] = useState({
    parentId: idBook,
    pageNumber: 0,
    pageSize: 10,
  })

  const { onSuccess, onError } = useNotification()
  const router = useRouter()
  const bookID = parseInt(String(idBook), 10)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      parentId: idBook,
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }

  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      parentId: idBook,
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }
  useEffect(() => {
    const getDetailBook = async () => {
      try {
        if (bookID) {
          const [book, themes] = await Promise.all([
            groupsService.getGroupsById(idBook),
            groupsService.getGroupsList(postReq),
          ])
          setDataBook(book.data)
          setDataThemes(themes.data)
        }
      } catch {
        onError('Error al cargar los datos')
      }
    }
    if (idBook) void getDetailBook()
  }, [postReq])

  const deleteTopicElement = async (id: number) => {
    try {
      await groupsService.deleteById(id)
      onSuccess('Tema eliminado correctamente')
      void router.push(`/book/${bookID}`)
      setOpenDialog(false)
    } catch {
      onError('Hubo un error al eliminar tema')
      setOpenDialog(false)
    }
  }

  const amountLoadedTheme = dataThemes?.totalElements || 0
  const subtitleThemes =
    amountLoadedTheme === 1 ? '1 tema cargado' : `${amountLoadedTheme} temas cargados`

  return !!dataBook && !!dataThemes ? (
    <>
      <FormDetailEditorialBookComponent
        idBook={Number(idBook)}
        tableSubTitle={subtitleThemes}
        dataBook={dataBook}
        dataTable={dataThemes}
        onDeleteBookTopic={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        idEditorial={Number(idEditorial)}
        onPageChange={handleChangePage}
        onRowsPaginationChange={handleChangePagination}
      />
      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar el tema?"
        subtitleText="Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void deleteTopicElement(idDelete)}
        open={openDialog}
      />
    </>
  ) : null
}

export default FormDetailEditorialBook
