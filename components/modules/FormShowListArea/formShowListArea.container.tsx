/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import Spinner from 'components/atoms/Spinner'
import { AreaGeneralResponse } from 'services/models/areas/response.model'
import { areaService } from 'services/modules/area.module'

import { useNotification } from '../../../utils/hooks/notification'
import FormShowListArea from './formShowListArea.component'

const FormShowListAreaContainer = () => {
  const [dataAreas, setDataAreas] = useState<AreaGeneralResponse>(Object)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [postReq, setPostReq] = useState({
    pageNumber: 0,
    pageSize: 10,
  })

  const { onSuccess, onError } = useNotification()

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

  async function getAreasData() {
    try {
      const { data } = await areaService.getListAreas(postReq)
      setDataAreas(data)
    } catch {
      onError('Error al cargar los datos')
    }
  }

  const deleteAreaService = async (id: number) => {
    try {
      await areaService.deleteArea(id)
      onSuccess('Área eliminada correctamente')
      setOpenDialog(false)
      void getAreasData()
    } catch {
      onError('Hubo un error al eliminar el área')
      setOpenDialog(false)
    }
  }
  const router = useRouter()

  const redirectToDetail = (id: number) => {
    void router.push(`/area/${id}`)
  }

  useEffect(() => {
    void getAreasData()
  }, [onError, postReq, router])

  const amountLoadedApps = dataAreas?.totalElements || 0
  const subtitleApps =
    amountLoadedApps === 1 ? '1 área cargada' : `${amountLoadedApps} áreas cargadas`

  return dataAreas?.content ? (
    <>
      <FormShowListArea
        title="Áreas"
        subtitle={subtitleApps}
        buttonText="Agregar nueva área"
        onDelete={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        onDetails={(id) => redirectToDetail(id)}
        content={dataAreas}
        activePage={postReq.pageNumber}
        pageChange={handleChangePage}
        rowsPaginationChange={handleChangePagination}
        columns={[
          { id: 'iconUrl', label: '', width: '5%' },
          { id: 'name', label: 'Nombre', width: '20%' },
          { id: 'description', label: 'Descripción', width: '65%' },
        ]}
      />
      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar el área?"
        subtitleText="Eliminar esta área implica que se perderá toda la información y contenido de las temáticas, aplicaciones y materiales asociados a la misma. Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void deleteAreaService(idDelete)}
        open={openDialog}
      />
    </>
  ) : (
    <Spinner />
  )
}

export default FormShowListAreaContainer
