/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { SubscriptionAssignmentCompoment } from './subscriptionAssignment.component'
import { AlowanceFormModel } from './subscriptionAssignment.model'

type FormNewEditCountryContainerProps = {
  onClose: () => void
}

export const SubscriptionAssignmentContainer = (props: FormNewEditCountryContainerProps) => {
  const { onClose } = props
  const [loading, setLoading] = useState(true)

  const methods = useForm<AlowanceFormModel>()
  const { handleSubmit: handleSubmitFromLibrary } = methods

  const getDataApiData = async () => {
    try {
      setLoading(false)
    } catch {
      setLoading(false)

      onClose()
    }
  }

  const handleSubmit: SubmitHandler<AlowanceFormModel> = async () => {
    try {
      setLoading(true)
    } catch {
      setLoading(false)
    }
    setLoading(false)
    onClose()
  }

  useEffect(() => {
    void getDataApiData()
  }, [])

  const formLoadProps = {
    title: 'Asignar suscripción',
    finishButtonText: 'Confirmar',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
  }

  return (
    <FormProvider {...methods}>
      <SubscriptionAssignmentCompoment formLoadProps={formLoadProps} />
    </FormProvider>
  )
}
