/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { InputSelectProps } from 'components/atoms/inputs/InputSelect'
import { newApplicationService } from 'services/modules/application.module'
import { useNotification } from 'utils/hooks/notification'

import { ApplicationComponent } from './application.component'
import { ApplicationFormModel } from './application.models'
import { createOrUpdateAppService, getDefaultValuesService } from './application.services'

export type ApplicationContainerProps = {
  isNewForm: boolean
  applicationId: number
  topicId?: number
  onClose: () => void
}

export const ApplicationContainer = (props: ApplicationContainerProps) => {
  // Props
  const { isNewForm, applicationId, topicId = 0, onClose } = props

  // Hooks
  const methods = useForm<ApplicationFormModel>()
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  const { onError, onSuccess } = useNotification()

  const router = useRouter()

  // States
  const [options, setOptions] = useState<InputSelectProps['options']>([])

  const [associatedMediaIds, setAssociatedMediaIds] = useState<number[]>([])

  const [loading, setLoading] = useState(true)

  // Methods
  const getApplicationTypes = async () => {
    const { data } = await newApplicationService.getTypes()
    setOptions(data.content)
  }

  const getDefaultValues = async () => {
    try {
      setLoading(true)

      // Initialize service
      const { getMainInfo, getStoreAdministrationData } = getDefaultValuesService()

      // Get default values
      const { applicationType, classroomCode, productUnitId, tabs } = await getMainInfo(
        applicationId,
      )

      const { idsToDelete, price, disponibility, icon, associatedMedia } =
        await getStoreAdministrationData(productUnitId)

      setAssociatedMediaIds(idsToDelete)

      // Adapt values to form
      const defaultValues: ApplicationFormModel = {
        step1: {
          applicationType,
          classroomCode,
          tabs,
          storeAdministration: {
            price,
            disponibility,
            icon,
            associatedMedia,
          },
        },
      }

      reset(defaultValues)
      setLoading(false)
    } catch {
      setLoading(false)
      onError('Error al obtener los datos de la aplicación')
      onClose()
    }
  }

  // Handlers
  const handleSubmit: SubmitHandler<ApplicationFormModel> = async (formData) => {
    try {
      setLoading(true)

      // Initialize service
      const {
        createApplication,
        addTranslations,
        uploadIcon,
        uploadAssociatedMedia,
        createVersion,
        updateApplication,
        deleteAssociatedMedia,
      } = createOrUpdateAppService(formData)

      // Step 1
      const { appId, packageId } = isNewForm
        ? await createApplication(topicId)
        : await updateApplication(applicationId)

      await uploadAssociatedMedia(packageId)

      await Promise.all([addTranslations(appId), uploadIcon(appId)])

      if (!isNewForm) await deleteAssociatedMedia(packageId, associatedMediaIds)

      // Create version
      if (isNewForm) await createVersion(appId)

      // Finish
      void router.push(`/application/${appId}`)
      setLoading(false)
      onSuccess(
        isNewForm ? 'Aplicación creada correctamente' : 'Aplicación actualizada correctamente',
      )
    } catch {
      setLoading(false)
      onError(
        isNewForm
          ? 'Hubo un error al crear la aplicación'
          : 'Hubo un error al editar la aplicación',
      )
    }
    onClose()
  }

  // Effects
  useEffect(() => {
    void getApplicationTypes()

    if (!isNewForm) void getDefaultValues()
  }, [])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Nueva Aplicación' : 'Editar Aplicación',
    finishButtonText: isNewForm ? 'Agregar aplicación' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <ApplicationComponent options={options} formLoadProps={formLoadProps} />
    </FormProvider>
  )
}
