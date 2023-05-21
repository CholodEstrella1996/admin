/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { FormFilterProps } from 'components/molecules/Tables/TableSubscriptions/tableSubscriptions.model'
import { CountryResponse } from 'services/models/country/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { customerService } from 'services/modules/customers.module'
import { locationService } from 'services/modules/location.module'
import { GetSubscriptionsParams, subscriptionsService } from 'services/modules/subscriptions.module'
import { useNotification } from 'utils/hooks/notification'

import ShowListSuscriptionsComponent from './showListSubscription.component'

export const ShowListSubscriptions = () => {
  const methods = useForm<FormFilterProps>()
  const [dataSuscription, setDataSuscription] =
    useState<SubscriptionsResponse['getSubscriptions']>()
  const [isLoading, setIsLoading] = useState(false)
  const [download, setDownload] = useState(false)
  const [dataCountries, setDataCountries] = useState<InputSelectOption[]>()
  const [clientsType, setClientsType] = useState<InputSelectOption[]>()
  const [subscriptionsType, setSubscriptionsType] = useState<InputSelectOption[]>()
  const [statusType, setStatusType] = useState<InputSelectOption[]>()
  const { onError } = useNotification()
  const [subtitleTable, setSubtitleTable] = useState('')
  const [filtersTable, setFiltersTable] = useState<GetSubscriptionsParams>({})
  const [firstLoad, setFirstLoad] = useState({ first: false })

  const formatKindsData = (content: SubscriptionsResponse['getKinds']) => {
    const newData = content.content.map((item) => ({
      id: item.id,
      name: item.name,
      disabled: false,
      displayName: item.displayName,
    }))
    return newData
  }

  const formatCountryData = (content: CountryResponse['getCountrys']) => {
    const newData = content.content.map((item) => ({
      id: Number(item.id),
      name: item.name,
      disabled: false,
    }))
    return newData
  }

  const getCustomerFilters = async () => {
    setIsLoading(true)
    try {
      const subscriptions = await subscriptionsService.getSubscriptions(filtersTable)

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
      const [subscriptions, countries, status, cliType, subsType] = await Promise.all([
        subscriptionsService.getSubscriptions(filtersTable),
        locationService.getCountries(),
        subscriptionsService.getStatus(),
        customerService.getKinds(),
        subscriptionsService.getKinds(),
      ])

      setDataCountries(formatCountryData(countries.data))
      setStatusType(formatKindsData(status.data))
      setClientsType(formatKindsData(cliType.data))
      setSubscriptionsType(formatKindsData(subsType.data))
      // Set subtítulos de tabla
      const amountSubtitleTable = subscriptions.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 suscripción cargada'
          : `${amountSubtitleTable} suscripciones cargadas`,
      )

      setDataSuscription(subscriptions.data)
    } catch {
      onError('Error al cargar los datos de clientes')
    }
  }

  const downloadListSubscription = async () => {
    setDownload(true)
    const params = {
      clientKind: filtersTable?.clientKind,
      countryId: filtersTable?.countryId,
      status: filtersTable?.status,
      kind: filtersTable?.kind,
      searchQuery: filtersTable?.searchQuery,
    }
    try {
      await customerService.downloadSubscriptionList('', params)
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

  if (dataSuscription && dataCountries && clientsType && subscriptionsType && statusType) {
    const selectsDataApi = {
      countrys: dataCountries,
      clientsType,
      subsType: subscriptionsType,
      statusType,
    }

    return (
      <>
        <FormProvider {...methods}>
          <ShowListSuscriptionsComponent
            dataTable={dataSuscription}
            selectsData={selectsDataApi}
            subtitle={subtitleTable}
            isLoading={isLoading}
            onChangeFilters={(filters) => setFiltersTable(filters)}
            onDownloadExcel={() => downloadListSubscription()}
          />
        </FormProvider>
        {download && <LoadingModal message="Descargando archivo, por favor espere..." />}
      </>
    )
  }
  return null
}
