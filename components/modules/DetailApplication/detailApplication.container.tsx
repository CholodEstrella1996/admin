import { useEffect, useState } from 'react'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import Spinner from 'components/atoms/Spinner'
import { ApplicationMaterials } from 'services/models/applicationMaterial.model'
import { ApplicationTechnical } from 'services/models/applicationTechnical.model'
import { ApiResponseTopicLearningUnits } from 'services/models/book.model'
import applicationService from 'services/modules/application'
import materialService from 'services/modules/material.module'
import { GetStoreParams, packageService } from 'services/modules/packages.module'
import { Content } from 'utils/models/modelsBase'
import { StoreData } from 'utils/models/reactFormFieldsTabs'

import { useNotification } from '../../../utils/hooks/notification'
import { DetailApplicationComponent } from './detailApplication.component'

const textContent = {
  name: 'Aplicación',
  buttonText: 'Editar',
  learningSubtitle: 'Asocie las unidades de aprendizaje relevantes para este laboratorio',
  learningAdd: 'Asociar',
}

const technicalDetailTitles = {
  executable: 'Ejecutables',
  codeRoom: 'Código de aula',
  appStore: 'Enlace appstore',
  version: 'Versión',
  securityVersion: 'Versión de seguridad',
  packageName: 'Package name Android',
}

export type DetailApplicationContainerProps = {
  idApp: number
}

export const DetailApplicationContainer = ({ idApp }: DetailApplicationContainerProps) => {
  const [dataStore, setDataStore] = useState<StoreData>()
  const [dataTranslations, setDataTranslations] = useState<Content[]>()
  const [dataTechnical, setDataTechnical] = useState<ApplicationTechnical>()
  const [dataMaterials, setDataMaterials] = useState<ApplicationMaterials>()
  const [dataLearningUnit, setDataLearningUnit] = useState<ApiResponseTopicLearningUnits>()
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [appType, setAppType] = useState(String)

  const { onSuccess, onError } = useNotification()

  const detailAppID = idApp

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [postReq, setPostReq] = useState({
    pageNumber: 0,
    pageSize: 10,
  })
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
    async function getDetailApplicationData() {
      try {
        const params: GetStoreParams = { productUnitId: detailAppID }
        const [store, translations, technical, materials] = await Promise.all([
          packageService.getStore(params),
          applicationService.getApplicationTranslation(detailAppID),
          applicationService.getApplicationTechnical(detailAppID),
          applicationService.getApplicationMaterials(detailAppID, postReq),
        ])

        setDataStore(store.data.content[0])
        setDataTranslations(translations.data.content)
        if (translations.data.content?.at(0)?.type?.name.toLowerCase() === 'laboratory') {
          setAppType('laboratory')
          const units = await applicationService.getApplicationLearningUnit(detailAppID)
          setDataLearningUnit(units.data)
        } else {
          setAppType('learning unit')
        }
        setDataTechnical(technical.data)
        setDataMaterials(materials.data)
      } catch {
        onError('Error al cargar los datos')
      }
    }
    getDetailApplicationData().finally(() => {})
  }, [detailAppID, onError, postReq])

  const deleteMaterialService = async (id: number) => {
    try {
      await materialService.deleteMaterial(id)
      onSuccess('Material eliminado correctamente')
      const material = await applicationService.getApplicationMaterials(detailAppID, postReq)
      setDataMaterials(material.data)
      setOpenDialog(false)
    } catch {
      onError('Hubo un error al eliminar material')
      setOpenDialog(false)
    }
  }

  const amountLoadedMaterials = dataMaterials?.totalElements || 0
  const subtitleMaterials =
    amountLoadedMaterials === 1
      ? '1 material cargado'
      : `${amountLoadedMaterials} materiales cargados`

  if (!idApp) return null
  return dataStore && dataTranslations && dataTechnical && dataMaterials ? (
    <>
      <DetailApplicationComponent
        storeApp={dataStore}
        dataTabs={dataTranslations}
        technicalDetail={dataTechnical}
        learningUnits={dataLearningUnit}
        appMaterials={dataMaterials}
        subtitleMaterial={subtitleMaterials}
        onDeleteMaterial={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        appTitle={dataStore?.name}
        textContent={textContent}
        technicalDetailTitles={technicalDetailTitles}
        idApplication={detailAppID}
        applicationType={appType}
        onPageChange={handleChangePage}
        onRowsPaginationChange={handleChangePagination}
      />

      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar el material?"
        subtitleText="Eliminar este material implica que se perderá toda la información y archivo asociado al mismo. Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void deleteMaterialService(idDelete)}
        open={openDialog}
      />
    </>
  ) : (
    <Spinner />
  )
}
