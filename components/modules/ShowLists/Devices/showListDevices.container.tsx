/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { FormFilterProps } from 'components/molecules/Tables/TableDevices/tableDevices.model'
import { DevicesResponse } from 'services/models/devices/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { DevicesParams, devicesService } from 'services/modules/devices.module'
import { subscriptionsService } from 'services/modules/subscriptions.module'
import { useNotification } from 'utils/hooks/notification'

import { ShowListDevicesComponent } from './showListDevices.component'

type Props = {
  idSubscription: number
}
export const ShowListDevice = ({ idSubscription }: Props) => {
  const router = useRouter()

  const methods = useForm<FormFilterProps>()
  const [loading, setLoading] = useState(false)
  const [download, setDownload] = useState(false)
  const [firstLoad, setFirstLoad] = useState({ first: false })
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionsResponse['getSubscription']>()
  const [dataDevices, setDataDevices] = useState<DevicesResponse['getDevices']>()
  const [dataTypeVendor, setDataTypeVendor] = useState<InputSelectOption[]>()
  const [subtitleTable, setSubtitleTable] = useState('')

  const { onError, onSuccess } = useNotification()
  const [filtersTable, setFiltersTable] = useState<DevicesParams>({})
  const formatVendorData = (content: DevicesResponse['getVendor']) => {
    const newData = content.content.map((item) => ({
      id: item.id,
      name: item.name,
      disable: false,
      displayName: item.name,
    }))
    return newData
  }

  const getCustomerApiData = async () => {
    try {
      const [devices, subscription, vendor] = await Promise.all([
        devicesService.getDevices(Number(idSubscription), filtersTable),
        subscriptionsService.getSubscription(Number(idSubscription)),
        devicesService.getVendor(),
      ])
      setDataTypeVendor(formatVendorData(vendor.data))
      setSubscriptionData(subscription.data)

      const amountSubtitleTable = devices.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 dispositivo cargado'
          : `${amountSubtitleTable} dispositivos cargados`,
      )

      setDataDevices(devices.data)
    } catch {
      onError('Error al cargar los datos de dispositivos')
    }
  }
  const getDevicesFilters = async () => {
    setLoading(true)
    try {
      const devices = await devicesService.getDevices(Number(idSubscription), filtersTable)

      const amountSubtitleTable = devices.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 dispositivo cargado'
          : `${amountSubtitleTable} dispositivos cargados`,
      )

      setDataDevices(devices.data)
    } catch {
      onError('Error al cargar los datos de dispositivos')
    }
    setLoading(false)
  }

  const downloadListDevices = async () => {
    const params = {
      searchQuey: filtersTable?.searchQuery,
      vendor: filtersTable?.vendor,
    }
    setDownload(true)
    try {
      await devicesService.downloadDevicesList(idSubscription, params)
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
      void getDevicesFilters()
    } else setFirstLoad((prevValues) => ({ ...prevValues, first: true }))
  }, [filtersTable])

  const handleDeleteDevice = async (id: number) => {
    try {
      await devicesService.deleteDevice(id)
      onSuccess('Has eliminado el dispositivo correctamente')
      void router.push(`/subscription/${idSubscription}/devices`)
    } catch {
      onError('No logramos eliminar el dispositivo. Intente nuevamente mas tarde  ')
    }
  }
  if (dataDevices && subtitleTable && dataTypeVendor && subscriptionData) {
    const dataHeader = {
      id: subscriptionData.customer.id,
      subs: subscriptionData.customer.name,
    }
    return (
      <>
        <FormProvider {...methods}>
          <ShowListDevicesComponent
            dataTitle={dataHeader}
            dataTable={dataDevices}
            dataTypeVendor={dataTypeVendor}
            subTitle={subtitleTable}
            onChangeFilters={(filters) => {
              setFiltersTable(filters)
            }}
            onDelete={(id) => void handleDeleteDevice(id)}
            isLoading={loading}
            onDownloadExcel={() => downloadListDevices()}
          />
        </FormProvider>
        {download && <LoadingModal message="Descargando archivo, por favor espere..." />}
      </>
    )
  }
  return null
}

export default ShowListDevice
