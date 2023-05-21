/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { GroupsByIdResponse, GroupsListResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { useNotification } from 'utils/hooks/notification'

import FormDetailsCurriculumComponent from './formDetailsCurriculum.component'

type Props = {
  curriculumId: number
}

const FormDetailsCurriculum = ({ curriculumId }: Props) => {
  const [dataCurriculum, setDataCurriculum] = useState<GroupsByIdResponse>()
  const [dataTopics, setDataTopics] = useState<GroupsListResponse>()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)

  const { onSuccess, onError } = useNotification()
  const router = useRouter()

  const [postReq, setPostReq] = useState({
    parentId: curriculumId,
    pageNumber: 0,
    pageSize: 10,
  })

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      parentId: curriculumId,
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }

  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      parentId: curriculumId,
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }

  useEffect(() => {
    const getDetailBook = async () => {
      try {
        if (!curriculumId) return
        const [book, themes] = await Promise.all([
          groupsService.getGroupsById(curriculumId),
          groupsService.getGroupsList(postReq),
        ])
        setDataCurriculum(book.data)
        setDataTopics(themes.data)
      } catch {
        onError('Error al cargar los datos')
      }
    }
    if (curriculumId) void getDetailBook()
  }, [postReq])

  const deleteTopicElement = async (id: number) => {
    try {
      await groupsService.deleteById(id)
      onSuccess('Asignatura eliminada correctamente')
      void router.push(`/curriculum/${curriculumId}`)
      setOpenDialog(false)
    } catch {
      onError('Hubo un error al eliminar asignatura')
      setOpenDialog(false)
    }
  }

  const amountLoadedSubject = dataTopics?.totalElements || 0
  const subtitleThemes =
    amountLoadedSubject === 1
      ? '1 asignatura cargada'
      : `${amountLoadedSubject} asignaturas cargadas`

  return !!dataCurriculum && !!dataTopics ? (
    <>
      <FormDetailsCurriculumComponent
        curriculumId={curriculumId}
        tableSubTitle={subtitleThemes}
        dataCurriculum={dataCurriculum}
        dataTable={dataTopics}
        onDeleteCurriculum={(id: number) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        onPageChange={handleChangePage}
        onRowsPaginationChange={handleChangePagination}
      />
      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar la asignatura?"
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

export default FormDetailsCurriculum
