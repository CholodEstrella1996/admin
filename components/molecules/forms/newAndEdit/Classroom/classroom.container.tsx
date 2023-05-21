/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'

import router from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { CustomerResponse } from 'services/models/customers/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { subscriptionsService } from 'services/modules/subscriptions.module'
import { useNotification } from 'utils/hooks/notification'

import { CustomerParams, customerService } from '../../../../../services/modules/customers.module'
import { InputSelectOption } from '../../../../atoms/inputs/InputSelect/inputSelect.component'
import { ClassRoomComponent } from './classroom.component'
import { ClassRoomFormModel } from './classroom.models'

type FormNewEditCountryContainerProps = {
  isNewForm: boolean
  onClose: () => void
  idSuscription?: number
}

const setValuesDefault = (data: SubscriptionsResponse['getSubscription']) => {
  const defaultData: ClassRoomFormModel = {
    customer: {
      id: data.customer.id,
      name: `${data.customer.name}   (${data.customer.email})`,
      displayName: `${data.customer.name}   (${data.customer.email})`,
    },
    classroomLicence: {
      id: Number(data.id),
      name: data.licenceNumber.replace('GA-', ''),
      displayName: data.licenceNumber.replace('GA-', ''),
    },
    licenceNumber: data.licenceNumber,
    offlineActivations: Number(data.offlineActivations),
    installations: data.allowedAccess,
    endDate: data.endDate,
    startDate: data.startDate,
    status: {
      id: data.status.id,
      name: data.status.name,
      displayName: data.status.displayName,
    },
  }
  return defaultData
}

export const ClassRoomContainer = (props: FormNewEditCountryContainerProps) => {
  const { isNewForm = false, onClose, idSuscription } = props
  const [loading, setLoading] = useState(true)
  const [customerSelect, SetCustomerSelect] = useState<InputSelectOption[]>()
  const [customerStatus, SetCustomerStatus] = useState<InputSelectOption[]>()
  const [filters] = useState<CustomerParams>({
    ga: true,
  })

  const methods = useForm<ClassRoomFormModel>()
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  const { onSuccess, onError } = useNotification()

  const convertedStatus = (_dataCustomer: CustomerResponse['getStatus']) => {
    const convertedOptions: InputSelectOption[] = _dataCustomer.content.map((item) => ({
      id: item.id,
      name: item.name,
      displayName: item.displayName,
    }))
    return convertedOptions
  }
  const convertedSelect = (_dataCustomer: CustomerResponse['getCustomerList']) => {
    const convertedOptions: InputSelectOption[] = _dataCustomer.content.map((item) => ({
      id: item.id,
      name: 'classroom-manager',
      displayName: `${item.name}   (${item.email})`,
    }))
    return convertedOptions
  }

  const handleSubmit: SubmitHandler<ClassRoomFormModel> = async (data) => {
    try {
      setLoading(true)

      const subscriptionDataBody = {
        customerId: data.customer.id,
        kind: 'classroom-manager',
        offlineActivations: Number(data.offlineActivations),
        allowedAccess: Number(data.installations),
        licenceId: data.classroomLicence.id,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status.name,
      }
      if (!isNewForm && idSuscription)
        await subscriptionsService.putSubscriptionClassRoom(idSuscription, subscriptionDataBody)
      else await subscriptionsService.postSubscriptionClassRoom(subscriptionDataBody)

      onSuccess(`Has ${isNewForm ? 'creado' : 'editado'} la licencia correctamente.`)
      void router.push(`/classroom`)
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
      const [suscription, status] = await Promise.all([
        subscriptionsService.getSubscription(id),
        customerService.getStatus(filters),
      ])

      SetCustomerSelect([])
      SetCustomerStatus(convertedStatus(status.data))

      const defaultValues = setValuesDefault(suscription.data)
      reset(defaultValues)

      setLoading(false)
    } catch {
      onError('Error al obtener datos del Aula')
      onClose()
    }
  }

  const getDataApiData = async () => {
    try {
      const [customerApi, status] = await Promise.all([
        customerService.getsCustomerListClassroom(),
        customerService.getStatus(filters),
      ])

      SetCustomerSelect(convertedSelect(customerApi.data))
      SetCustomerStatus(convertedStatus(status.data))

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

    if (!idSuscription) return
    void getSubscription(idSuscription)
  }, [])

  const formLoadProps = {
    title: isNewForm ? 'Agregar licencia Gestor de Aula' : 'Editar licencia Gestor de Aula',
    finishButtonText: isNewForm ? 'Confirmar' : 'Guardar Cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
  }

  if (customerSelect && customerStatus) {
    return (
      <FormProvider {...methods}>
        <ClassRoomComponent
          formLoadProps={formLoadProps}
          CustomerSelect={customerSelect}
          customerStatus={customerStatus}
          isNewForm={isNewForm}
        />
      </FormProvider>
    )
  }
  return null
}
