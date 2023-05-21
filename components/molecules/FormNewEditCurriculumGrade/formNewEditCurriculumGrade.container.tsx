/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ApiResponseAssignature } from 'services/models/curriculums'
import { curriculumService } from 'services/modules/curriculums'
import { useNotification } from 'utils/hooks/notification'

import { FormNewEditCurriculumsModel } from '../FormNewEditCurriculums/formNewEditCurriculums.model'
import FormNewEditCurriculumGrade from './formNewEditCurriculumGrade.component'

const defaultValues = (_dataCurriculumGrade: ApiResponseAssignature) => ({
  curriculumName: _dataCurriculumGrade.name,
  curriculumDescription: _dataCurriculumGrade.description,
  curriculumDisponibility: _dataCurriculumGrade.visible,
})

type FormNewEditCurriculumContainerProps = {
  parentId?: number
  idCurriculum?: number
  idGrade?: number
  isNewForm: boolean
  onClose: () => void
}

const FormNewEditCurriculumContainer = (props: FormNewEditCurriculumContainerProps) => {
  // Props
  const { isNewForm, onClose, parentId, idGrade } = props

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
        kind: 'grade',
        parentId: Number(parentId),
      }

      if (isNewForm && bodyData) {
        const responseCurriculum = await curriculumService.postNewAssignature(bodyData)
        onSuccess('Se agregó correctamente el grado')
        void router.push(`/grade/${responseCurriculum.data.id}`)
        onClose()
      }
      if (!isNewForm && bodyData) {
        const responseIdCurriculum = await curriculumService.putAssignature(
          Number(idGrade),
          bodyData,
        )
        onSuccess('Se actualizó correctamente el grado')
        void router.push(`/grade/${responseIdCurriculum.data.id}`)
        onClose()
      }
    } catch {
      onError('Error al cargar los datos de grado')
    }
    setLoading(false)
  }

  // Effects
  useEffect(() => {
    const getCurriculumApiData = async () => {
      if (!isNewForm !== undefined) {
        try {
          setLoading(true)
          const responseCurriculum = await curriculumService.getAssignature(Number(idGrade))

          if (!responseCurriculum) return
          const dataSetted = defaultValues(responseCurriculum.data)
          reset(dataSetted)
        } catch {
          onError('Error al cargar los datos')
        }
        setLoading(false)
      }
    }
    if (!isNewForm) void getCurriculumApiData()
  }, [isNewForm])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Agregar nuevo grado' : 'Editar grado',
    finishButtonText: isNewForm ? 'Agregar grado' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditCurriculumGrade formLoadProps={formLoadProps} />
    </FormProvider>
  )
}
export default FormNewEditCurriculumContainer
