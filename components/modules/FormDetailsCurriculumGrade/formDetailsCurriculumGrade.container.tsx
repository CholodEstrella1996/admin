/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { GroupsByIdResponse, GroupsListResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { useNotification } from 'utils/hooks/notification'

import FormDetailsCurriculumGradeComponent from './formDetailsCurriculumGrade.component'

type Props = {
  idGrade: number
}
const FormDetailsCurriculumGrade = ({ idGrade }: Props) => {
  const [dataGrade, setDataGrade] = useState<GroupsByIdResponse>()
  const [dataTopics, setDataTopics] = useState<GroupsListResponse>()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [postReq, setPostReq] = useState({
    parentId: idGrade,
    pageNumber: 0,
    pageSize: 10,
  })

  const { onSuccess, onError } = useNotification()
  const router = useRouter()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      parentId: idGrade,
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }

  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      parentId: idGrade,
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }
  useEffect(() => {
    const getDetailGrade = async () => {
      try {
        if (!idGrade) return
        const [grade, topics] = await Promise.all([
          groupsService.getGroupsById(idGrade),
          groupsService.getGroupsList(postReq),
        ])
        setDataGrade(grade.data)
        setDataTopics(topics.data)
      } catch {
        onError(`Error al cargar los datos`)
      }
    }
    if (idGrade) void getDetailGrade()
  }, [postReq])

  const deleteTopicElement = async (id: number) => {
    try {
      await groupsService.deleteById(id)
      onSuccess(`Tema eliminado correctamente`)
      void router.push(`/grade/${Number(idGrade)}`)
      setOpenDialog(false)
    } catch {
      onError(`Hubo un error al eliminar tema`)
      setOpenDialog(false)
    }
  }

  const amountLoadedTopics = dataTopics?.totalElements || 0
  const subtitleTopics =
    amountLoadedTopics === 1 ? '1 tema cargado' : `${amountLoadedTopics} temas cargados`

  return !!dataGrade && !!dataTopics ? (
    <>
      <FormDetailsCurriculumGradeComponent
        idGrade={Number(idGrade)}
        dataGrade={dataGrade}
        dataTable={dataTopics}
        tableSubTitle={subtitleTopics}
        onDeleteTopic={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
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
export default FormDetailsCurriculumGrade
