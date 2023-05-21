/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ApiResponseAssignature } from 'services/models/curriculums'
import { curriculumService } from 'services/modules/curriculums'
import { useNotification } from 'utils/hooks/notification'

import { FormNewEditCurriculumsModel } from '../FormNewEditCurriculums/formNewEditCurriculums.model'
import FormNewEditCurriculum from './formNewEditCurriculum.component'

const getDefaultValues = (_dataCurriculum: ApiResponseAssignature) => ({
  curriculumName: _dataCurriculum.name,
  curriculumDescription: _dataCurriculum.description,
  curriculumDisponibility: _dataCurriculum.visible,
  curriculumsYear: _dataCurriculum.year,
})

type FormNewEditCurriculumContainerProps = {
  parentId?: number
  idCurriculum?: number
  isNewForm: boolean
  onClose: () => void
}

const FormNewEditCurriculumContainer = (props: FormNewEditCurriculumContainerProps) => {
  // Props
  const { isNewForm, onClose, parentId, idCurriculum } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<FormNewEditCurriculumsModel>()

  // States
  const [loading, setLoading] = useState(true)
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  // Handlers
  const handleSubmit: SubmitHandler<FormNewEditCurriculumsModel> = async (data) => {
    setLoading(true)
    try {
      const { curriculumName, curriculumDescription, curriculumsYear, curriculumDisponibility } =
        data
      const bodyData = {
        name: curriculumName,
        description: curriculumDescription,
        visible: curriculumDisponibility,
        kind: 'curriculum',
        year: curriculumsYear,
        parentId: Number(parentId),
      }
      if (isNewForm && bodyData) {
        const responseCurriculum = await curriculumService.postNewAssignature(bodyData)
        onSuccess('Se agregó correctamente el currículo')
        void router.push(`/curriculum/${responseCurriculum.data.id}`)
        onClose()
      }
      if (!isNewForm && bodyData) {
        const responseIdCurriculum = await curriculumService.putAssignature(
          Number(idCurriculum),
          bodyData,
        )
        onSuccess('Se actualizó correctamente el currículo')
        void router.push(`/curriculum/${responseIdCurriculum.data.id}`)
        onClose()
      }
    } catch {
      onError('Error al cargar los datos de currículo')
    }
    setLoading(false)
  }

  // Effects
  useEffect(() => {
    const getCurriculumApiData = async () => {
      if (!isNewForm !== undefined) {
        try {
          setLoading(true)
          const responseCurriculum = await curriculumService.getAssignature(Number(idCurriculum))

          if (!responseCurriculum) return
          const defaultValues = getDefaultValues(responseCurriculum.data)
          reset(defaultValues)
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
    title: isNewForm ? 'Agregar nuevo currículo' : 'Editar currículo',
    finishButtonText: isNewForm ? 'Agregar currículo' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditCurriculum formLoadProps={formLoadProps} />
    </FormProvider>
  )
}
export default FormNewEditCurriculumContainer
