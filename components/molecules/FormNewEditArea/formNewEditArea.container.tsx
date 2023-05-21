/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { areaService } from 'services/modules/area.module'
import { GetStoreParams, packageService } from 'services/modules/packages.module'
import { addValidationFieldsArea } from 'utils/helpers/addValidationFieldsArea'
import { convertResourceToFile } from 'utils/helpers/convertResourceToFile'
import { Languages, RFormFieldsTabs, StoreData } from 'utils/models/reactFormFieldsTabs'

import { useNotification } from '../../../utils/hooks/notification'
import FormNewEditArea from './formNewEditArea.component'
import FormNewEditAreaService from './formNewEditArea.service'

type FormNewEditAreaProps = {
  isNewForm?: boolean
  dataArea?: StoreData
  idEditArea?: number
  onClose: () => void
}

const FormNewEditAreaContainer = (props: FormNewEditAreaProps) => {
  // Props
  const { isNewForm = false, dataArea, idEditArea, onClose } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<RFormFieldsTabs>()

  // States
  const [dataStore, setDataStore] = useState<StoreData>(dataArea || Object)
  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  // Methods
  const getDefaultValues = async (_dataStore: StoreData, _dataTranslations: Languages[]) => ({
    areaNameEN: _dataTranslations[0].content.name,
    areaDescriptionEN: _dataTranslations[0].content.description,
    areaKeywordEN: _dataTranslations[0].content.keywords ?? [],
    areaNameES: _dataTranslations[1].content.name,
    areaDescriptionES: _dataTranslations[1].content.description,
    areaKeywordES: _dataTranslations[1].content.keywords ?? [],
    areaNamePT: _dataTranslations[2].content.name,
    areaDescriptionPT: _dataTranslations[2].content.description,
    areaKeywordPT: _dataTranslations[2].content.keywords ?? [],
    areaNameTR: _dataTranslations[3] ? _dataTranslations[3].content?.name : '',
    areaDescriptionTR: _dataTranslations[3] ? _dataTranslations[3].content?.description : '',
    areaKeywordTR: _dataTranslations[3] ? _dataTranslations[3].content?.keywords : [],
    areaDisponibility: _dataStore.visible,
    areaPrice: _dataStore.price,
    file: _dataStore.icon ? await convertResourceToFile({ url: _dataStore.icon.url }) : [],
  })

  const getAreaData = async () => {
    if (!isNewForm && idEditArea !== undefined) {
      try {
        setLoading(true)
        const params: GetStoreParams = { productUnitId: idEditArea }
        const [translations, store] = await Promise.all([
          areaService.getAreaTranslation(idEditArea),
          packageService.getStore(params),
        ])

        const dataFromApi = store.data.content[0]
        setDataStore({
          ...dataFromApi,
          colorDark: dataFromApi.colorDark ?? dataFromApi.color,
          colorLight: dataFromApi.colorLight ?? dataFromApi.color,
        })

        const tranlationFields = addValidationFieldsArea(translations)

        if (dataFromApi && tranlationFields) {
          const dataSetted = await getDefaultValues(dataFromApi, tranlationFields)
          reset(dataSetted)
        }
        setLoading(false)
      } catch {
        setLoading(false)
        onError('Error al cargar los datos de área')
        onClose()
      }
    }
  }

  // Handlers
  const handleSubmit: SubmitHandler<RFormFieldsTabs> = async (data) => {
    try {
      setLoading(true)
      const responseIdNewEditArea = await FormNewEditAreaService(data, isNewForm, idEditArea)
      setLoading(false)
      onSuccess(`Se ${isNewForm ? 'agregó' : 'actualizó'} correctamente el área`)
      void router.push(`/area/${responseIdNewEditArea}`)
    } catch {
      setLoading(false)
      onError('Error al cargar datos de un área')
    }

    onClose()
  }

  // Effects
  useEffect(() => {
    if (!isNewForm) void getAreaData()
  }, [idEditArea, isNewForm])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Nueva Área' : 'Editar Área',
    finishButtonText: isNewForm ? 'Agregar área' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditArea storeData={dataStore} formLoadProps={formLoadProps} />
    </FormProvider>
  )
}

export default FormNewEditAreaContainer
