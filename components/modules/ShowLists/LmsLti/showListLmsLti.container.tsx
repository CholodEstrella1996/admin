/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { FormFilterProps } from 'components/molecules/Tables/TableLmsLti/tableLmsLti.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { customerService } from 'services/modules/customers.module'
import { GetSubscriptionsParams, subscriptionsService } from 'services/modules/subscriptions.module'
import { useNotification } from 'utils/hooks/notification'

import ShowListLmsLtiComponent from './showListLmsLti.component'

export const ShowListLmsLti = () => {
  const methods = useForm<FormFilterProps>()

  const { onError } = useNotification()

  const [dataSuscription, setDataSuscription] =
    useState<SubscriptionsResponse['getSubscriptionLmsLti']>()
  const [isLoading, setIsLoading] = useState(false)
  const [download, setDownload] = useState(false)
  const [firstLoad, setFirstLoad] = useState({ first: false })
  const [statusType, setStatusType] = useState<InputSelectOption[]>()
  const [subtitleTable, setSubtitleTable] = useState('')
  const [filtersTable, setFiltersTable] = useState<GetSubscriptionsParams>({
    kind: 'lms-lti',
  })

  const formatKindsData = (content: SubscriptionsResponse['getKinds']) => {
    const newData = content.content.map((item) => ({
      id: item.id,
      name: item.name,
      disabled: false,
      displayName: item.displayName,
    }))
    return newData
  }

  const getCustomerFilters = async () => {
    setIsLoading(true)
    try {
      const subscriptions = await subscriptionsService.getSubscriptionsLmsLti(filtersTable)

      // Set subtítulos de tabla
      const amountSubtitleTable = subscriptions.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 suscripción cargada'
          : `${amountSubtitleTable} suscripciones cargadas`,
      )

      setDataSuscription(subscriptions.data)
    } catch {
      onError('Error al cargar los datos de suscripciones')
    }
    setIsLoading(false)
  }

  const getCustomerApiData = async () => {
    try {
      const [subscriptions, status] = await Promise.all([
        subscriptionsService.getSubscriptionsLmsLti(filtersTable),
        subscriptionsService.getStatus(),
      ])

      setStatusType(formatKindsData(status.data))

      // Set subtítulos de tabla
      const amountSubtitleTable = subscriptions.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 suscripción cargado'
          : `${amountSubtitleTable} suscripciones cargados`,
      )

      setDataSuscription(subscriptions.data)
    } catch {
      onError('Error al cargar los datos de clientes')
    }
  }

  const downloadListLmsLti = async () => {
    const params = {
      kind: 'lms-lti',
      support: filtersTable?.support,
      status: filtersTable?.status,
      searchQuery: filtersTable?.searchQuery,
    }
    setDownload(true)
    try {
      await customerService.downloadSubscriptionList('lms-lti', params)
    } catch {
      onError('Hubo un error al descargar archivo de excel')
    }
    setDownload(false)
  }

  useEffect(() => {
    void getCustomerApiData()
  }, [])

  useEffect(() => {
    if (firstLoad.first === true) {
      void getCustomerFilters()
    } else setFirstLoad((prevValues) => ({ ...prevValues, first: true }))
  }, [filtersTable])

  if (dataSuscription && statusType) {
    const selectsDataApi = {
      statusType,
    }

    return (
      <>
        <FormProvider {...methods}>
          <ShowListLmsLtiComponent
            dataTable={dataSuscription}
            selectsData={selectsDataApi}
            subtitle={subtitleTable}
            isLoading={isLoading}
            onChangeFilters={(filters) => setFiltersTable(filters)}
            onDownloadExcel={() => downloadListLmsLti()}
          />
        </FormProvider>
        {download && <LoadingModal message="Descargando archivo, por favor espere..." />}
      </>
    )
  }
  return null
}
