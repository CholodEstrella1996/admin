/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { FormFilterProps } from 'components/molecules/Tables/TableClassroom/tableClassroom.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { customerService } from 'services/modules/customers.module'
import { GetSubscriptionsParams, subscriptionsService } from 'services/modules/subscriptions.module'
import { useNotification } from 'utils/hooks/notification'

import ShowListClassroomComponent from './showListClassroom.component'

export const ShowListClassroom = () => {
  const methods = useForm<FormFilterProps>()
  const { onError } = useNotification()
  const [dataSuscription, setDataSuscription] =
    useState<SubscriptionsResponse['getSubscriptionLmsLti']>()

  const [isLoading, setIsLoading] = useState(false)
  const [download, setDownload] = useState(false)
  const [firstLoad, setFirstLoad] = useState({ first: false })
  const [subtitleTable, setSubtitleTable] = useState('')
  const [filtersTable, setFiltersTable] = useState<GetSubscriptionsParams>({
    kind: String('classroom-manager'),

    searchQuery: undefined,
  })

  const getCustomerFilters = async () => {
    setIsLoading(true)
    try {
      const subscriptions = await subscriptionsService.getSubscriptionsLmsLti(filtersTable)

      // Set subtítulos de tabla
      const amountSubtitleTable = subscriptions.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 licencia cargada'
          : `${amountSubtitleTable} licencias cargadas`,
      )
      setDataSuscription(subscriptions.data)
    } catch {
      onError('Error al cargar los datos')
    }
    setIsLoading(false)
  }

  const getCustomerApiData = async () => {
    try {
      const subscriptions = await subscriptionsService.getSubscriptionsLmsLti(filtersTable)

      // Set subtítulos de tabla
      const amountSubtitleTable = subscriptions.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 licencia cargada'
          : `${amountSubtitleTable} licencias cargadas`,
      )
      setDataSuscription(subscriptions.data)
    } catch {
      onError('Error al cargar los datos de licencias')
    }
  }

  const downloadListClassroom = async () => {
    const params = {
      kind: 'classroom-manager',
      searchQuery: filtersTable?.searchQuery,
    }
    setDownload(true)
    try {
      await customerService.downloadSubscriptionList('gestor de aula', params)
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
  }, [filtersTable.searchQuery])

  if (dataSuscription) {
    return (
      <>
        <FormProvider {...methods}>
          <ShowListClassroomComponent
            dataTable={dataSuscription}
            subtitle={subtitleTable}
            isLoading={isLoading}
            onChangeFilters={(filters) => setFiltersTable(filters)}
            onDownloadExcel={() => downloadListClassroom()}
          />
        </FormProvider>
        {download && <LoadingModal message="Descargando archivo, por favor espere..." />}
      </>
    )
  }
  return null
}
