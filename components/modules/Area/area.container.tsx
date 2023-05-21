import { useEffect, useState } from 'react'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { AreaResponse } from 'services/models/areas/response.model'
import { TopicListResponse } from 'services/models/topic.model'
import { areaService } from 'services/modules/area.module'
import { GetStoreParams, packageService } from 'services/modules/packages.module'
import { topicService } from 'services/modules/topic.module'
import { StoreData } from 'utils/models/reactFormFieldsTabs'

import { useNotification } from '../../../utils/hooks/notification'
import AreaComponent from './area.component'

type Props = {
  idArea: number
}

const AreaContainer = ({ idArea }: Props) => {
  const [dataApiStore, setDataApiStore] = useState<StoreData>()
  const [dataApiTabs, setDataApiTabs] = useState<AreaResponse['getTabsArea']>()
  const [dataApiTopicList, setDataApiTopicList] = useState<TopicListResponse>()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)

  const { onSuccess, onError } = useNotification()

  const [postReq, setPostReq] = useState({
    id: idArea,
    pageNumber: 0,
    pageSize: 10,
  })

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      id: idArea,
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }

  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      id: idArea,
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }

  useEffect(() => {
    async function getFrom() {
      try {
        const params: GetStoreParams = { productUnitId: idArea }
        const [resDataApiStore, resDataApiTabs, resDataApiTopicList] = await Promise.all([
          packageService.getStore(params),
          areaService.getTabsArea(idArea),
          topicService.getTopicList(postReq),
        ])
        setDataApiStore(resDataApiStore.data.content[0])
        setDataApiTabs(resDataApiTabs?.data)
        setDataApiTopicList(resDataApiTopicList.data)
      } catch {
        onError('Error al cargar los datos')
      }
    }
    if (idArea) void getFrom()
  }, [idArea, onError, postReq])

  const deleteTopicElement = async (id: number) => {
    try {
      await topicService.deleteTopic(id)
      onSuccess('Temática eliminada correctamente')
      const topic = await topicService.getTopicList(postReq)
      setDataApiTopicList(topic.data)
      setOpenDialog(false)
    } catch {
      onError('Hubo un error al eliminar la temática')
      setOpenDialog(false)
    }
  }
  const totalElements = dataApiTopicList?.totalElements || 0
  const tableSubtitle =
    totalElements === 1 ? '1 temática cargada' : `${totalElements} temáticas cargadas`

  return idArea !== undefined && !!dataApiStore && !!dataApiTabs && !!dataApiTopicList ? (
    <>
      <AreaComponent
        idArea={idArea}
        serviceAreas={dataApiStore}
        dataTabs={dataApiTabs?.content}
        dataTable={dataApiTopicList}
        onDeleteTopic={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        pageChange={handleChangePage}
        rowsPaginationChange={handleChangePagination}
        tableSubtitle={tableSubtitle}
      />

      <AlertModal
        titleText="¿Estás seguro que deseas eliminar la temática?"
        subtitleText="Eliminar esta temática implica que se perderá toda la información y contenido de las aplicaciones y materiales asociados a la misma. Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void deleteTopicElement(idDelete)}
        open={openDialog}
      />
    </>
  ) : null
}
export default AreaContainer
