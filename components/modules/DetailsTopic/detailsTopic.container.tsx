import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import Spinner from 'components/atoms/Spinner'
import { ApplicationResponse } from 'services/models/application.model'
import applicationService from 'services/modules/application'
import { GetStoreParams, packageService } from 'services/modules/packages.module'
import { topicService } from 'services/modules/topic.module'
import { Content } from 'utils/models/modelsBase'
import { StoreData } from 'utils/models/reactFormFieldsTabs'

import { useNotification } from '../../../utils/hooks/notification'
import DetailsTopicComponent from './detailsTopic.component'

export type TopicProps = {
  idTopic: number
}

const DetailTopicContainer = ({ idTopic }: TopicProps) => {
  const [dataStore, setDataStore] = useState<StoreData>()
  const [dataTranslations, setDataTranslations] = useState<Content[]>(Object)
  const [dataApplications, setDataApplications] = useState<ApplicationResponse>(Object)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)

  const { onSuccess, onError } = useNotification()

  const topicID = idTopic

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [postReq, setPostReq] = useState({
    topicId: topicID,
    pageNumber: 0,
    pageSize: 10,
  })

  const router = useRouter()

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      topicId: topicID,
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }
  const handlePaginationChange = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      topicId: topicID,
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }

  useEffect(() => {
    async function getDetailData() {
      try {
        if (topicID) {
          const params: GetStoreParams = { productUnitId: topicID }
          const [store, translations, applications] = await Promise.all([
            packageService.getStore(params),
            topicService.getTopicTranslations(topicID),
            applicationService.getApplications(postReq),
          ])

          setDataStore(store.data.content[0])
          setDataTranslations(translations.data.content)
          setDataApplications(applications.data)
        }
      } catch {
        onError('Error al cargar los datos')
      }
    }
    getDetailData().finally(() => {})
  }, [postReq, onError, topicID])

  const deleteApplication = async (id: number) => {
    try {
      await applicationService.deleteApplication(id)
      onSuccess('Aplicación eliminada correctamente')
      const applic = await applicationService.getApplications(postReq)
      setDataApplications(applic.data)
      setOpenDialog(false)
    } catch {
      onError('Hubo un error al eliminar aplicación')
      setOpenDialog(false)
    }
  }

  const redirectToShowDetails = (id: number) => {
    void router.push(`/application/${id}`)
  }

  const amountLoadedApps = dataApplications?.totalElements || 0
  const subtitleApps =
    amountLoadedApps === 1 ? '1 aplicación cargada' : `${amountLoadedApps} aplicaciones cargadas`

  const store = {
    visible: dataStore?.visible,
    price: dataStore?.price,
    iconUrl: dataStore?.icon?.url,
    color: dataStore?.color ?? undefined,
  }

  return dataStore && dataTranslations && dataApplications ? (
    <>
      <DetailsTopicComponent
        idTopic={Number(idTopic)}
        storeName={dataStore?.name}
        storeTopic={store}
        dataApplications={dataApplications}
        dataTabs={dataTranslations}
        subtitleApps={subtitleApps}
        onDetailApplication={(id) => redirectToShowDetails(id)}
        onDeleteApplication={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        pageChange={handlePageChange}
        rowsPaginationChange={handlePaginationChange}
      />

      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar la aplicación?"
        subtitleText="Eliminar esta aplicación implica que se perderá toda la información y contenido de la aplicación y materiales asociados a la misma. Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void deleteApplication(idDelete)}
        open={openDialog}
      />
    </>
  ) : (
    <Spinner />
  )
}

export default DetailTopicContainer
