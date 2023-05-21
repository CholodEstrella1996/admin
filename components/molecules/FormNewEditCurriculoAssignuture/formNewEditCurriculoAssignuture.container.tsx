/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ApiResponseAssignature } from 'services/models/curriculums'
import { curriculumService } from 'services/modules/curriculums'
import { useNotification } from 'utils/hooks/notification'

import { FormNewEditCurriculumsModel } from '../FormNewEditCurriculums/formNewEditCurriculums.model'
import FormNewEditCurriculoAssignuture from './formNewEditCurriculoAssignuture.component'

const getDefaultValues = (_dataAssignature: ApiResponseAssignature) => ({
  curriculumName: _dataAssignature.name,
  curriculumDescription: _dataAssignature.description,
  curriculumDisponibility: _dataAssignature.visible,
})

type FormNewEditCurriculoAssignutureContainerProps = {
  parentId?: number
  idAssignature?: number
  isNewForm: boolean
  onClose: () => void
}

const FormNewEditCurriculoAssignutureContainer = (
  props: FormNewEditCurriculoAssignutureContainerProps,
) => {
  // Props
  const { isNewForm, onClose, parentId, idAssignature } = props

  // Hooks
  const router = useRouter()
  const methods = useForm<FormNewEditCurriculumsModel>()
  const { onSuccess, onError } = useNotification()

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
        kind: 'subject',
        parentId: Number(parentId),
      }
      if (isNewForm && bodyData) {
        const responseIdAssignature = await curriculumService.postNewAssignature(bodyData)
        onSuccess('Se agregó correctamente la asignatura')
        void router.push(`/subject/${responseIdAssignature.data.id}`)
        onClose()
      }
      if (!isNewForm && bodyData) {
        const responseIdAssignature = await curriculumService.putAssignature(
          Number(idAssignature),
          bodyData,
        )
        onSuccess('Se actualizó correctamente la asignatura')
        void router.push(`/subject/${responseIdAssignature.data.id}`)
        onClose()
      }
    } catch {
      onError('Error al cargar los datos de Asignatura')
    }
    setLoading(false)
  }

  // Effects
  useEffect(() => {
    const getAssignatureApiData = async () => {
      if (!isNewForm !== undefined) {
        try {
          setLoading(true)
          const responseAssignature = await curriculumService.getAssignature(Number(idAssignature))

          if (!responseAssignature) return
          const defaultValues = getDefaultValues(responseAssignature.data)
          reset(defaultValues)
        } catch {
          onError('Error al cargar los datos')
        }
        setLoading(false)
      }
    }
    if (!isNewForm) void getAssignatureApiData()
  }, [isNewForm])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Agregar nueva asignatura' : 'Editar asignatura',
    finishButtonText: isNewForm ? 'Agregar asignatura' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditCurriculoAssignuture formLoadProps={formLoadProps} />
    </FormProvider>
  )
}
export default FormNewEditCurriculoAssignutureContainer
