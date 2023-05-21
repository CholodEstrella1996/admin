/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { editorialService } from 'services/modules/editorial.module'
import { convertResourceToFile } from 'utils/helpers/convertResourceToFile'
import { useNotification } from 'utils/hooks/notification'
import { RFile } from 'utils/models/reactFormFieldsTabs'

import FormNewEditEditorial from './formNewEditEditorial.component'
import { ApiResponseEditorial, FormNewEditEditorialModel } from './formNewEditEditorial.model'

type FormNewEditEditorialContainerProps = {
  isNewForm: boolean
  idEditorial?: number
  onSubmit?: () => Promise<void>
  onClose: () => void
}

const FormNewEditEditorialContainer = (props: FormNewEditEditorialContainerProps) => {
  // Props
  const { isNewForm = false, idEditorial = 1, onClose } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<FormNewEditEditorialModel>()

  // States
  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  // Methods
  const getDefaultValues = async (_dataEditorial: ApiResponseEditorial) => ({
    editorialName: _dataEditorial.name,
    editorialIcon: _dataEditorial.iconUrl
      ? await convertResourceToFile({ url: _dataEditorial.iconUrl })
      : [],
    editorialDisponibility: _dataEditorial.visible,
  })

  const formatBody = (
    editorialName: string,
    editorialDisponibility: boolean,
    editorialIcon: RFile,
  ) => {
    const dataBodyPost = {
      name: editorialName,
      kind: 'publisher',
      visible: editorialDisponibility,
    }
    const formData = new FormData()

    if ((editorialIcon?.data as File)?.size) formData.append('file', editorialIcon?.data as File)

    formData.append('data', new Blob([JSON.stringify(dataBodyPost)], { type: 'application/json' }))

    return formData
  }

  // Handlers
  const handleSubmit: SubmitHandler<FormNewEditEditorialModel> = async (data) => {
    try {
      setLoading(true)
      const { editorialName, editorialIcon, editorialDisponibility } = data
      if (isNewForm) {
        const respEditorial = await editorialService.postEditorial(
          formatBody(editorialName, editorialDisponibility, editorialIcon[0]),
        )
        onSuccess(`Se agregó correctamente la editorial`)
        void router.push(`/publisher/${respEditorial.data.id}`)
        onClose()
      }

      if (!isNewForm) {
        const respEditorial = await editorialService.putEditorial(
          idEditorial,
          formatBody(editorialName, editorialDisponibility, editorialIcon[0]),
        )
        setLoading(false)
        onSuccess(`Se actualizó correctamente la editorial`)
        void router.push(`/publisher/${respEditorial.data.id}`)
      }
    } catch {
      setLoading(false)
      onError('Error al cargar datos de editorial')
    }
    onClose()
  }

  // Effects
  useEffect(() => {
    const getEditorialApiData = async () => {
      if (!isNewForm && idEditorial !== undefined) {
        try {
          setLoading(true)
          const respApiEditorial = await editorialService.getEditorialList(idEditorial)

          if (respApiEditorial) {
            const dataSetted = await getDefaultValues(respApiEditorial.data)
            reset(dataSetted)
          }
          setLoading(false)
        } catch {
          setLoading(false)
          onError('Error al cargar los datos de editoriales')
          onClose()
        }
      }
    }
    if (!isNewForm) void getEditorialApiData()
  }, [idEditorial, isNewForm])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Agregar nueva editorial' : 'Editar editorial',
    finishButtonText: isNewForm ? 'Agregar editorial' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditEditorial formLoadProps={formLoadProps} />
    </FormProvider>
  )
}

export default FormNewEditEditorialContainer
