/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'

import { getDefaultValuesService } from 'components/molecules/forms/newAndEdit/Application/application.services'
import { newApplicationService } from 'services/modules/application.module'
import { useNotification } from 'utils/hooks/notification'

import TechnicalDetails from './technicalDetails.component'

type TechnicalDetailsModel = {
  appleUrl: string
  version: string
  securityVersion: string
  AndroidPackageName: string
}

type TechnicalDetailsProps = {
  applicationId: number
  onClose: () => void
}

const TechnicalDetailsContainer = (props: TechnicalDetailsProps) => {
  // Props
  const { onClose, applicationId } = props
  const router = useRouter()
  // Hooks

  const methods = useForm<TechnicalDetailsModel>()
  const { onError, onSuccess } = useNotification()
  // States
  const [loading, setLoading] = useState(false)
  const [LoadData, setloadData] = useState(false)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  const getDefaultValues = async () => {
    try {
      setLoading(true)

      // Initialize service
      const { getVersionData } = getDefaultValuesService()

      let defaultValues: TechnicalDetailsModel = {
        securityVersion: '',
        AndroidPackageName: '',
        appleUrl: '',
        version: '',
      }

      if (applicationId) {
        const { AndroidPackageName, appleUrl, version, securityVersion } = await getVersionData(
          applicationId,
        )

        defaultValues = {
          securityVersion,
          AndroidPackageName,
          appleUrl,
          version,
        }
      }

      reset(defaultValues)
      setLoading(false)
    } catch {
      setLoading(false)
      onError('Error al obtener los datos de técnicos de la aplicación')
      onClose()
    }
  }

  useEffect(() => {
    setloadData(false)
    void getDefaultValues()
    setloadData(true)
  }, [])

  // Handlers
  const handleSubmit: SubmitHandler<TechnicalDetailsModel> = async (data) => {
    setLoading(true)

    try {
      await newApplicationService.createVersion(applicationId, {
        description: data.AndroidPackageName,
        versionNumber: Number(data.version),
        securityVersionNumber: Number(data.securityVersion),
      })

      void router.push(`/application/${Number(applicationId)}`)
      onSuccess(`Has actualizado los datos correctamente.`)
    } catch {
      onError('No logramos agregar los datos de la aplicación.Intenta nuevamente más tarde.')
    }
    setLoading(false)
    onClose()
  }

  // Base props
  const formLoadProps = {
    title: 'Agregar datos aplicación',
    finishButtonText: 'Agregar datos',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      {LoadData && <TechnicalDetails formLoadProps={formLoadProps} />}
    </FormProvider>
  )
}

export default TechnicalDetailsContainer
