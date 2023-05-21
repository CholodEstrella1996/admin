/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { FormFilterProps } from 'components/molecules/Tables/TableAnnouncement/tableAnnouncement.model'
import { SystemResponse } from 'services/models/systems/response.model'
import { useNotification } from 'utils/hooks/notification'

import { mock } from './mock'
import ShowListSystemComponent, { GetSystemParams } from './showListSystem.component'

type PropsMenu = {
  idMenu: number
}
export const ShowListSystem = ({ idMenu }: PropsMenu) => {
  const methods = useForm<FormFilterProps>()
  const { onError } = useNotification()
  const [title, setTitle] = useState<string>('')

  const [isLoading, setIsLoading] = useState(false)
  const [subtitleTable, setSubtitleTable] = useState('')
  const [system, setSystem] = useState<SystemResponse['getSystem']>()
  const [filtersTable, setFiltersTable] = useState<GetSystemParams>({
    pageSize: 10,
    type: undefined,
  })

  const getCustomerFilters = async () => {
    setIsLoading(true)
    try {
      // const subscriptions = await subscriptionsService.getSubscriptionsLmsLti(filtersTable)
      // Set subtítulos de tabla

      setSystem(mock)
      const amountSubtitleTable = system?.totalElements || 0
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
      setSystem(mock)
      const amountSubtitleTable = system?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 versión cargada'
          : `${amountSubtitleTable} versiones cargadas`,
      )
    } catch {
      onError('Error al cargar los datos de las versiones ')
    }
  }

  useEffect(() => {
    void getCustomerApiData()
  }, [])

  useEffect(() => {
    void getCustomerFilters()
  }, [filtersTable])

  useEffect(() => {
    void getCustomerApiData()
    if (Number(idMenu) === 1) setTitle('Android')
    if (Number(idMenu) === 2) setTitle('MacOs')
    if (Number(idMenu) === 3) setTitle('Windows')
  }, [idMenu])

  if (system) {
    return (
      <FormProvider {...methods}>
        <ShowListSystemComponent
          title={title}
          dataTable={system}
          subtitle={subtitleTable}
          isLoading={isLoading}
          onChangeFilters={(filters) => setFiltersTable(filters)}
        />
      </FormProvider>
    )
  }
  return null
}
