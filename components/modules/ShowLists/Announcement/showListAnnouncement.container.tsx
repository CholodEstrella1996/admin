/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { FormFilterProps } from 'components/molecules/Tables/TableAnnouncement/tableAnnouncement.model'
import { AnnouncementResponse } from 'services/models/announcement/response.model'
import { useNotification } from 'utils/hooks/notification'

import { mock } from './mock'
import ShowListAnnouncementComponent, {
  GetAnnouncementParams,
} from './showListAnnouncement.component'

export const ShowListAnnouncement = () => {
  const methods = useForm<FormFilterProps>()
  const { onError } = useNotification()

  const [isLoading, setIsLoading] = useState(false)
  const [subtitleTable, setSubtitleTable] = useState('')
  const [announcement, setAnnouncement] = useState<AnnouncementResponse['getAnnouncementDetali']>()
  const [filtersTable, setFiltersTable] = useState<GetAnnouncementParams>({
    pageSize: 10,
    searchQuery: undefined,
  })

  const getCustomerFilters = async () => {
    setIsLoading(true)
    try {
      // const subscriptions = await subscriptionsService.getSubscriptionsLmsLti(filtersTable)
      // Set subtítulos de tabla
      setAnnouncement(mock)
      const amountSubtitleTable = announcement?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 anuncio cargado'
          : `${amountSubtitleTable} anuncios cargados`,
      )
    } catch {
      onError('Error al cargar los datos de anuncios')
    }
    setIsLoading(false)
  }

  const getCustomerApiData = async () => {
    try {
      // Set subtítulos de tabla
      setAnnouncement(mock)
      const amountSubtitleTable = announcement?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 anuncio cargado'
          : `${amountSubtitleTable} anuncios cargados`,
      )
    } catch {
      onError('Error al cargar los datos de anuncios')
    }
  }

  useEffect(() => {
    void getCustomerApiData()
  }, [])

  useEffect(() => {
    void getCustomerFilters()
  }, [filtersTable])

  if (announcement) {
    return (
      <FormProvider {...methods}>
        <ShowListAnnouncementComponent
          dataTable={announcement}
          subtitle={subtitleTable}
          isLoading={isLoading}
          onChangeFilters={(filters) => setFiltersTable(filters)}
        />
      </FormProvider>
    )
  }
  return null
}
