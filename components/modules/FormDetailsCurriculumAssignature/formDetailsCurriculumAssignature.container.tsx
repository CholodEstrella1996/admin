/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { GroupsByIdResponse, GroupsListResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { useNotification } from 'utils/hooks/notification'

import FormDetailsCurriculumAssignatureComponent from './formDetailsCurriculumAssignature.component'

type Props = {
  idAssignature: number
  parentId?: string
}
const FormDetailsCurriculumAssignature = ({ idAssignature, parentId }: Props) => {
  const [dataAssignature, setDataAssignature] = useState<GroupsByIdResponse>()
  const [dataGrades, setDataGrades] = useState<GroupsListResponse>()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [postReq, setPostReq] = useState({
    parentId: idAssignature,
    pageNumber: 0,
    pageSize: 10,
  })

  const { onError, onSuccess } = useNotification()
  const router = useRouter()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      parentId: idAssignature,
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }

  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      parentId: idAssignature,
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }
  useEffect(() => {
    const getDetailAssignature = async () => {
      try {
        if (!idAssignature) return
        const [assignature, grades] = await Promise.all([
          groupsService.getGroupsById(idAssignature),
          groupsService.getGroupsList(postReq),
        ])
        setDataAssignature(assignature.data)
        setDataGrades(grades.data)
      } catch {
        onError('Error al cargar los datos')
      }
    }
    if (idAssignature) void getDetailAssignature()
  }, [postReq])

  const deleteGradeElement = async (id: number) => {
    try {
      if (!id) return
      await groupsService.deleteById(id)
      onSuccess('Se eliminó correctamente el grado')
      void router.push(`/subject/${idAssignature}`)
      setOpenDialog(false)
    } catch {
      onError('Hubo un error al eliminar grado')
      setOpenDialog(false)
    }
  }

  const amountLoadedGrades = dataGrades?.totalElements || 0
  const subtitleGrades =
    amountLoadedGrades === 1 ? '1 grado cargado' : `${amountLoadedGrades} grados cargados`

  return !!dataAssignature && !!dataGrades ? (
    <>
      <FormDetailsCurriculumAssignatureComponent
        dataAssignature={dataAssignature}
        dataTable={dataGrades}
        idAssignature={Number(idAssignature)}
        parentId={Number(parentId)}
        tableSubTitle={subtitleGrades}
        onDeleteElement={(id: number) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        onPageChange={handleChangePage}
        onRowsPaginationChange={handleChangePagination}
      />

      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar el grado?"
        subtitleText="Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void deleteGradeElement(idDelete)}
        open={openDialog}
      />
    </>
  ) : null
}

export default FormDetailsCurriculumAssignature
