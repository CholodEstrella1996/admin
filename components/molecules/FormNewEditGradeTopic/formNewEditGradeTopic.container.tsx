/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ApiResponseAssignature } from 'services/models/curriculums'
import { curriculumService } from 'services/modules/curriculums'
import { useNotification } from 'utils/hooks/notification'

import { FormNewEditCurriculumsModel } from '../FormNewEditCurriculums/formNewEditCurriculums.model'
import FormNewEditGradeTopic from './formNewEditGradeTopic.component'
import { FormNewEditGradeTopicProps } from './formNewEditGradeTopic.model'

const defaultValues = (_dataGradeTopic: ApiResponseAssignature) => ({
  curriculumName: _dataGradeTopic.name,
  curriculumDescription: _dataGradeTopic.description,
  curriculumDisponibility: _dataGradeTopic.visible,
})

const FormNewEditGradeTopicContainer = (props: FormNewEditGradeTopicProps) => {
  // Props
  const { isNewForm, onClose, parentId, idTopic } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<FormNewEditCurriculumsModel>()

  // States
  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  // Handlers
  const handleSubmit: SubmitHandler<FormNewEditCurriculumsModel> = async (data) => {
    setLoading(true)
    try {
      const { curriculumName, curriculumDescription, curriculumDisponibility } = data
      const bodyData = {
        name: curriculumName,
        description: curriculumDescription,
        visible: curriculumDisponibility,
        kind: 'topic',
        parentId: Number(parentId),
      }
      if (isNewForm && bodyData) {
        const responseIdTopic = await curriculumService.postNewGradeTopic(bodyData)
        onSuccess('Se agregó correctamente el tema')
        void router.push(`/grade_topic/${responseIdTopic.data.id}`)
        onClose()
      }
      if (!isNewForm && bodyData) {
        const responseIdTopic = await curriculumService.putGradeTopic(Number(idTopic), bodyData)
        onSuccess('Se actualizó correctamente el tema')
        void router.push(`/grade_topic/${responseIdTopic.data.id}`)
        onClose()
      }
    } catch {
      onError('Error al cargar los datos del Tema')
    }
    setLoading(false)
  }

  // Effects
  useEffect(() => {
    const getTopicApiData = async () => {
      if (!isNewForm !== undefined) {
        try {
          setLoading(true)
          const responseGradeTopic = await curriculumService.getGradeTopic(Number(idTopic))

          if (!responseGradeTopic) return
          const dataSetted = defaultValues(responseGradeTopic.data)
          reset(dataSetted)
        } catch {
          onError('Error al cargar los datos')
        }
        setLoading(false)
      }
    }
    if (!isNewForm) void getTopicApiData()
  }, [isNewForm])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Agregar nuevo tema' : 'Editar tema',
    finishButtonText: isNewForm ? 'Agregar tema' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditGradeTopic formLoadProps={formLoadProps} />
    </FormProvider>
  )
}

export default FormNewEditGradeTopicContainer
