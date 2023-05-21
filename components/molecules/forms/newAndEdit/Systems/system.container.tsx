/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { useNotification } from 'utils/hooks/notification'

import { mock } from './mocks'
import { SystemComponent } from './system.component'
import { SystemFormModel } from './system.models'

type FormNewEditCountryContainerProps = {
  isNewForm: boolean
  onClose: () => void
  idSystem?: number
}
const setValuesDefault = (data: SystemFormModel) => {
  const defaultData: SystemFormModel = {
    title: data.title,
    description: data.description,
    version: data.version,
    executable: data.executable,
  }
  return defaultData
}

export const SystemContainer = (props: FormNewEditCountryContainerProps) => {
  const { isNewForm = false, onClose, idSystem } = props
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<SystemFormModel>()

  const methods = useForm<SystemFormModel>()
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  const { onError } = useNotification()

  const handleSubmit: SubmitHandler<SystemFormModel> = async () => {
    try {
      setLoading(true)
    } catch {
      onError(
        `No logramos ${
          isNewForm ? 'agregar' : 'editar'
        }  la licencia. Por favor intenta nuevamente más tarde.`,
      )
    }
    setLoading(false)
    onClose()
  }

  const getSubscription = async (id: number) => {
    try {
      if (id) setData(mock)

      const defaultValues = setValuesDefault(mock)
      reset(defaultValues)

      setLoading(false)
    } catch {
      onError('Error al obtener datos del Aula')
      onClose()
    }
  }

  const getDataApiData = async () => {
    try {
      setData(mock)

      setLoading(false)
    } catch {
      setLoading(false)
      onError('Error al obtener datos del Aula')
      onClose()
    }
  }

  useEffect(() => {
    if (isNewForm) {
      void getDataApiData()
      return
    }

    if (!idSystem) return
    void getSubscription(idSystem)
  }, [])

  const formLoadProps = {
    title: isNewForm ? 'Crear nueva versión' : 'Editar versión',
    finishButtonText: isNewForm ? 'Crear versión' : 'Guardar Cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
  }

  if (data) {
    return (
      <FormProvider {...methods}>
        <SystemComponent formLoadProps={formLoadProps} isNewForm={isNewForm} />
      </FormProvider>
    )
  }
  return null
}
