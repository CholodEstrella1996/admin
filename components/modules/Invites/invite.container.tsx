/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

import { ClassroomResponse } from 'services/models/classroom/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { classroomService } from 'services/modules/classroom.module'
import { customerService } from 'services/modules/customers.module'
import { useNotification } from 'utils/hooks/notification'
import { Language } from 'utils/models/classroom.models'

import InviteComponent from './invite.component'
import { FormInvites } from './invite.model'

export type InviteProps = {
  customerId: number
}

const InviteContainer = ({ customerId }: InviteProps) => {
  const methods = useForm<FormInvites>({ mode: 'all' })

  const { onSuccess, onError } = useNotification()

  const router = useRouter()

  const [subscription, setSubscription] = useState<SubscriptionsResponse['getSubscription']>()
  const [listLanguage, setListLanguage] = useState<Language[]>([])
  const [listGroup, setListGroup] = useState<ClassroomResponse['getGroups']>()

  const role = router.pathname.split('/', 4)[3].split('_', 1).toString()
  const isChild = subscription?.customer.kind.name === 'parent'

  const submitInvite = async (data: FormInvites) => {
    try {
      const idOrganization = subscription?.customer.organizationId

      const emailListSeted = Array.from(new Set(data.emailList))

      const dataNew = {
        ...data,
        languageCode: String(data.languageCode.value),
        role: isChild ? 'family-child' : `organization-${role}`,
        emailList: emailListSeted,
      }

      await classroomService.postInvites(Number(idOrganization), dataNew)
      onSuccess('Enviaste las invitaciones correctamente')
      await router.push(`/customer/${customerId}/members`)
    } catch {
      onError('Error al cargar listado de invitaciones')
    }
  }

  // Obtener datos para opciones de grupos.
  const getGroups = async (organizationId: number) => {
    if (!customerId) return
    try {
      const groups = await classroomService.getGroups(organizationId)
      setListGroup(groups.data)
    } catch {
      onError('Error al obtener datos de grupos')
    }
  }

  // Obtener datos de la suscripción activa
  const getSubscription = async () => {
    if (!customerId) return
    try {
      const subscriptionLatest = await customerService.getSubscriptionLatestActive(customerId)
      setSubscription(subscriptionLatest.data)
      void getGroups(subscriptionLatest.data.customer.organizationId)
    } catch {
      onError('Error al cargar los datos del cliente')
    }
  }

  // Obtener opciones para los lenguajes
  const getLanguage = async () => {
    try {
      const languages = await classroomService.getLanguages()

      setListLanguage(languages.data.content)
    } catch {
      onError('Error al cargar listado de idiomas')
    }
  }

  useEffect(() => {
    void getLanguage()
    void getSubscription()
  }, [])

  if (!subscription) return null

  return (
    <FormProvider {...methods}>
      <InviteComponent
        subscriptionData={subscription}
        listLanguage={listLanguage}
        listGroup={listGroup}
        dataInvite={(res: FormInvites) => void submitInvite(res)}
      />
    </FormProvider>
  )
}

export default InviteContainer
