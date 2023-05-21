/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { ClassroomResponse } from 'services/models/classroom/response.model'
import { AnyCustomer, CustomerResponse } from 'services/models/customers/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { CustomerParams, customerService } from 'services/modules/customers.module'
import { useNotification } from 'utils/hooks/notification'
import { Customer } from 'utils/models/customer.models'

import { classroomService } from '../../../services/modules/classroom.module'
import FormDetailsCustomersComponent from './formDetailsCustomers.component'

export type Props = {
  idCustomer: number
}
type Organization = Customer['government'] | Customer['institution']

export type OrganizationWithId = Omit<Organization, 'organization'> & {
  organization: Organization['organization'] & { id: number }
}

export const FormDetailsCustomers = ({ idCustomer }: Props) => {
  const [dataCustomer, setDataCustomer] = useState<AnyCustomer>()
  const [subscriptionsData, setSubscriptionsData] =
    useState<CustomerResponse['getCustomerSuscription']>()
  const [organizationData, setOrganizationData] = useState<ClassroomResponse['getOrganizations']>()
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionsResponse['getSubscription']>()
  const { onSuccess, onError } = useNotification()
  const [open, setOpen] = useState(false)
  const [idOrganization, setIdOrganization] = useState(0)

  const [filtersTable, setFiltersTable] = useState<CustomerParams>({
    pageNumber: 0,
    pageSize: 10,
  })
  const [subtitleTable, setSubtitleTable] = useState('')
  const router = useRouter()

  const getCustomerData = async () => {
    try {
      if (!idCustomer) return
      const customer = await customerService.getCustomer(idCustomer)

      setDataCustomer(customer.data)
      if (
        customer.data.kind === 'government' ||
        customer.data.kind === 'institution' ||
        customer.data.kind === 'parent'
      ) {
        setIdOrganization(Number(customer.data.organization.id))
        const organization = await classroomService.getOrganization(
          Number(customer.data.organization.id),
        )
        setOrganizationData(organization.data)
      }
    } catch {
      onError('Error al cargar los datos')
    }
  }

  const deleteCustomer = async () => {
    try {
      await customerService.deleteCustomer(idCustomer)
      onSuccess('Cliente eliminado correctamente')
      void router.push(`/customer`)
    } catch {
      onError('Error al eliminar cliente')
    }
  }

  const getCustomerSubscriptions = async () => {
    try {
      const subscriptions = await customerService.getSubscriptions(idCustomer, filtersTable)

      // Set subtítulos de tabla
      const amountSubtitleTable = subscriptions.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 suscripción asociada'
          : `${amountSubtitleTable} suscripciones asociadas`,
      )

      setSubscriptionsData(subscriptions.data)
    } catch {
      onError('Error al cargar los datos de suscripciones')
    }
  }

  const getSubscriptionLatestActive = async () => {
    try {
      const subscriptionLatest = await customerService.getSubscriptionLatestActive(idCustomer)
      setSubscriptionData(subscriptionLatest.data)
    } catch {
      onError('Error al obtener datos de la última suscripción')
    }
  }

  useEffect(() => {
    void getCustomerData()
  }, [])

  useEffect(() => {
    if (dataCustomer && filtersTable) {
      if (dataCustomer.kind !== 'government') {
        void getCustomerSubscriptions()
      }
      if (dataCustomer.kind === 'institution' || dataCustomer.kind === 'parent') {
        void getSubscriptionLatestActive()
      }
    }
  }, [dataCustomer, filtersTable])

  if (dataCustomer) {
    const data = {
      dataCustomer,
      organizationKind: organizationData,
      idOrganization,
      subscriptionData,
    }

    return (
      <>
        <AlertModal
          titleText="¿Quieres eliminar el cliente?"
          subtitleText={`Si eliminas el cliente: ${dataCustomer.user.firstName} ${dataCustomer.user.surname}, no podrás recuperarlo.`}
          cancelActionText="No, cancelar"
          onCancel={() => setOpen(false)}
          continueActionText="Sí, continuar"
          onContinue={() => void deleteCustomer()}
          open={open}
        />

        <FormDetailsCustomersComponent
          data={data}
          dataSuscription={{
            dataTable: subscriptionsData,
            subtitles: subtitleTable,
          }}
          onDeleteCustomer={() => setOpen(true)}
          onChangeFilters={(filters) => setFiltersTable(filters)}
          idCustomer={idCustomer}
        />
      </>
    )
  }
  return null
}
