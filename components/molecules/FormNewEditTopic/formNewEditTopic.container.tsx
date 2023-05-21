/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { GetStoreParams, packageService } from 'services/modules/packages.module'
import { topicService } from 'services/modules/topic.module'
import { addValidationFieldsTopic } from 'utils/helpers/addValidationFields'
import { convertResourceToFile } from 'utils/helpers/convertResourceToFile'
import { useNotification } from 'utils/hooks/notification'
import { Languages, RFormFieldsTabs, StoreData } from 'utils/models/reactFormFieldsTabs'

import FormNewEditTopic from './formNewEditTopic.component'
import FormNewEditTopicService from './formNewEditTopic.service'

type FormNewEditTopicProps = {
  isNewForm?: boolean
  idArea: number
  idTopic?: number
  onClose: () => void
}

const FormNewEditTopicContainer = (props: FormNewEditTopicProps) => {
  // Props
  const { isNewForm = false, idArea, idTopic, onClose } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<RFormFieldsTabs>()

  // States
  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, reset, setValue } = methods

  // Methods
  const getDefaultValues = async (_dataStore: StoreData, _dataTranslations: Languages[]) => ({
    topicNameEN: _dataTranslations[0].content.name,
    topicDescriptionEN: _dataTranslations[0].content.description,
    topicKeywordEN: _dataTranslations[0].content.keywords ?? [],
    topicNameES: _dataTranslations[1].content.name,
    topicDescriptionES: _dataTranslations[1].content.description,
    topicKeywordES: _dataTranslations[1].content.keywords ?? [],
    topicNamePT: _dataTranslations[2].content.name,
    topicDescriptionPT: _dataTranslations[2].content.description,
    topicKeywordPT: _dataTranslations[2].content.keywords ?? [],
    topicNameTR: _dataTranslations[3] ? _dataTranslations[3].content.name : '',
    topicDescriptionTR: _dataTranslations[3] ? _dataTranslations[3].content.description : '',
    topicKeywordTR: _dataTranslations[3] ? _dataTranslations[3].content.keywords : [],
    topicDisponibility: _dataStore.visible,
    topicPrice: _dataStore.price,
    file: _dataStore.icon?.url ? await convertResourceToFile({ url: _dataStore.icon.url }) : [],
  })

  const getTopicData = async () => {
    if (!isNewForm && idTopic !== undefined) {
      try {
        setLoading(true)
        const params: GetStoreParams = { productUnitId: idTopic }
        const [translations, store] = await Promise.all([
          topicService.getTopicTranslations(idTopic),
          packageService.getStore(params),
        ])

        const translationsFields = addValidationFieldsTopic(translations)

        if (store.data.content[0] && translationsFields) {
          const dataSetted = await getDefaultValues(store.data.content[0], translationsFields)
          reset(dataSetted)
        }
        setLoading(false)
      } catch {
        setLoading(false)
        onError('Error al cargar los datos de una temática')
        onClose()
      }
    }
  }

  // Handlers
  const handleSubmit: SubmitHandler<RFormFieldsTabs> = async (data) => {
    try {
      setLoading(true)
      const responseIdNewEditTopic = await FormNewEditTopicService(data, isNewForm, idArea, idTopic)
      setLoading(false)
      onSuccess(`Se ${isNewForm ? 'agregó' : 'actualizó'} correctamente una temática`)
      void router.push(`/topic/${responseIdNewEditTopic}`)
    } catch {
      setLoading(false)
      onError('Error al cargar datos de una temática')
    }

    onClose()
  }

  // Effects
  useEffect(() => {
    if (!isNewForm) void getTopicData()
  }, [isNewForm, setValue, idTopic, onClose])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Agregar nueva Temática' : 'Editar Temática',
    finishButtonText: isNewForm ? 'Agregar temática' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditTopic formLoadProps={formLoadProps} />
    </FormProvider>
  )
}

export default FormNewEditTopicContainer
