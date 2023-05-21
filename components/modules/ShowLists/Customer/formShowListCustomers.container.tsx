/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { CountryResponse } from 'services/models/country/response.model'
import { CustomerResponse } from 'services/models/customers/response.model'
import { customerService } from 'services/modules/customers.module'
import { locationService } from 'services/modules/location.module'
import { useNotification } from 'utils/hooks/notification'

import {
  FormFilterProps,
  SelectOptions,
} from '../../../molecules/Tables/TableCustomers/tableCustomers.model'
import FormShowListCustomersComponent from './formShowListCustomers.component'

export const FormShowListCustomers = () => {
  const router = useRouter()
  const methods = useForm<FormFilterProps>()
  const [loading, setLoading] = useState(false)
  const [download, setDownload] = useState(false)
  const [firstLoad, setFirstLoad] = useState({ first: false })
  const [dataCustomer, setDataCustomer] = useState<CustomerResponse['getCustomers']>()
  const [dataCountries, setDataCountries] = useState<SelectOptions[]>()
  const [dataTypeClients, setDataTypeClients] = useState<SelectOptions[]>()
  const { onError, onSuccess } = useNotification()
  const [subtitleTable, setSubtitleTable] = useState('')
  const [filtersTable, setFiltersTable] = useState<FormFilterProps>({})

  const formatKindsData = (content: CustomerResponse['getKinds']) => {
    const newData = content.content.map((item) => ({
      id: item.id,
      displayName: item.displayName,
      disabled: false,
      name: item.name,
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
    setLoading(true)
    try {
      const customers = await customerService.getCustomers(filtersTable)

      // Set subtítulos de tabla
      const amountSubtitleTable = customers.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 cliente cargado'
          : `${amountSubtitleTable} clientes cargados`,
      )

      setDataCustomer(customers.data)
    } catch {
      onError('Error al cargar los datos de clientes')
    }
    setLoading(false)
  }

  const getCustomerApiData = async () => {
    try {
      const [customers, countries, typeClients] = await Promise.all([
        customerService.getCustomers(filtersTable),
        locationService.getCountries(),
        customerService.getKinds(),
      ])
      // Set subtítulos de tabla
      const amountSubtitleTable = customers.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 cliente cargado'
          : `${amountSubtitleTable} clientes cargados`,
      )

      setDataCustomer(customers.data)

      setDataCountries(formatCountryData(countries.data))
      setDataTypeClients(formatKindsData(typeClients.data))
    } catch {
      onError('Error al cargar los datos de clientes')
    }
  }

  const downloadListCustomer = async () => {
    const params = {
      kind: filtersTable?.kind,
      countryId: filtersTable?.countryId,
      searchQuery: filtersTable?.searchQuery,
    }
    setDownload(true)
    try {
      await customerService.downloadCustomerList(params)
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

  const handleDeleteCustomer = async (id: number) => {
    try {
      await customerService.deleteCustomer(id)
      onSuccess('Cliente eliminado correctamente')
      void router.push(`/customer`)
    } catch {
      onError('Hubo un error al eliminar cliente')
    }
  }

  if (dataCustomer && dataCountries && dataTypeClients)
    return (
      <>
        <FormProvider {...methods}>
          <FormShowListCustomersComponent
            dataTable={dataCustomer}
            dataCountrys={dataCountries}
            dataTypeClients={dataTypeClients}
            subTitle={subtitleTable}
            onChangeFilters={(filters) => {
              setFiltersTable(filters)
            }}
            onDelete={(id) => void handleDeleteCustomer(id)}
            isLoading={loading}
            onDownloadExcel={() => downloadListCustomer()}
          />
        </FormProvider>
        {download && <LoadingModal message="Descargando archivo, por favor espere..." />}
      </>
    )
  return null
}
