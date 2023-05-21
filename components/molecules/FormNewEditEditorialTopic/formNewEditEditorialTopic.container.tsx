/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ApiResponseBookTopic } from 'services/models/book.model'
import { bookService } from 'services/modules/book.module'
import { useNotification } from 'utils/hooks/notification'

import FormNewEditEditorialTopic from './formNewEditEditorialTopic.component'
import { FormNewEditEditorialTopicModel } from './formNewEditEditorialTopic.model'

type Props = {
  isNewForm: boolean
  idBook: number
  idTopic?: number
  onClose: () => void
}

const FormNewEditEditorialTopicContainer = (props: Props) => {
  // Props
  const { isNewForm, idBook, idTopic = 50, onClose } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<FormNewEditEditorialTopicModel>()

  // States
  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, setValue } = methods

  // Methods
  const getDefaultValues = (_dataTopic: ApiResponseBookTopic) => ({
    topicEditorialTitle: _dataTopic.name,
    topicEditorialDisponibility: _dataTopic.visible,
  })

  const getBookTopicApiData = async () => {
    if (!isNewForm !== undefined) {
      try {
        setLoading(true)
        const responseTopic = await bookService.getBookTopic(idTopic)

        if (responseTopic) {
          const defaultValues = getDefaultValues(responseTopic.data)
          Object.entries(defaultValues).forEach(([name, value]) =>
            setValue(name as keyof FormNewEditEditorialTopicModel, value),
          )
        }
      } catch {
        onError('Error al cargar los datos')
      }
      setLoading(false)
    }
  }

  // Handlers
  const handleSubmit: SubmitHandler<FormNewEditEditorialTopicModel> = async (data) => {
    setLoading(true)
    try {
      const { topicEditorialDisponibility, topicEditorialTitle } = data
      const bodyData = {
        name: topicEditorialTitle,
        visible: topicEditorialDisponibility,
        kind: 'topic',
        parentId: idBook,
      }
      if (isNewForm && bodyData) {
        const responseIdNewEditTopic = await bookService.postNewTopic(bodyData)
        onSuccess(`Se agregó correctamente el tema`)
        onClose()
        void router.push(`/book_topic/${responseIdNewEditTopic.data.id}`)
      }
      if (!isNewForm && bodyData) {
        const responseIdNewEditTopic = await bookService.putBookTopic(idTopic, bodyData)
        onSuccess(`Se actualizó correctamente el tema`)
        onClose()
        void router.push(`/book_topic/${responseIdNewEditTopic.data.id}`)
      }
    } catch {
      onError('Error al cargar los datos del tema')
    }
    setLoading(false)
  }

  // Effects
  useEffect(() => {
    if (!isNewForm) void getBookTopicApiData()
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
      <FormNewEditEditorialTopic formLoadProps={formLoadProps} />
    </FormProvider>
  )
}
export default FormNewEditEditorialTopicContainer
