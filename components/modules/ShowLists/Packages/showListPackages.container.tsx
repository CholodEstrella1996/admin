/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { FormFilterProps } from 'components/molecules/Tables/TablePackages/tablePackage.model'
import { PackageResponse } from 'services/models/packages/response.model'
import { packageService, GetPackagesParams } from 'services/modules/packages.module'
import { useNotification } from 'utils/hooks/notification'

import { ShowListPackagesComponent } from './showListPackages.component'

export const ShowListPackages = () => {
  const router = useRouter()
  const [subtitleTable, setSubtitleTable] = useState('')

  const methods = useForm<FormFilterProps>()
  const [loading, setLoading] = useState(false)
  const [download, setDownload] = useState(false)

  const [packages, setPackage] = useState<PackageResponse['getStore']>()

  const { onError, onSuccess } = useNotification()

  const [params, setParams] = useState<GetPackagesParams>({
    type: 'saleable',
    pageSize: 10,
  })

  const getCustomerApiData = async () => {
    setLoading(true)
    try {
      const packagesData = await packageService.getPackages(params)

      const amountSubtitleTable = packagesData.data?.totalElements || 0
      setSubtitleTable(
        amountSubtitleTable === 1
          ? '1 paquete cargado'
          : `${amountSubtitleTable} paquetes cargados`,
      )

      setPackage(packagesData.data)
    } catch {
      onError('Error al cargar los datos de los paquetes')
    }
    setLoading(false)
  }

  const downloadListPackage = async () => {
    setDownload(true)
    try {
      await packageService.downloadPackageList()
    } catch {
      onError('Hubo un error al descargar archivo de excel')
    }
    setDownload(false)
  }

  useEffect(() => {
    void getCustomerApiData()
  }, [params])

  const deletePackage = async (id: number) => {
    try {
      await packageService.deletePackage(id)

      onSuccess('Has eliminado el paquete correctamente')
      void router.push(`/package`)
    } catch {
      onError('No logramos eliminar el paquete. Intenta nuevamente más tarde.')
    }
  }
  if (packages) {
    return (
      <>
        <FormProvider {...methods}>
          <ShowListPackagesComponent
            dataTable={packages}
            subTitle={subtitleTable}
            onDelete={(id) => void deletePackage(id)}
            isLoading={loading}
            onChangeFilters={(filters) => setParams(filters)}
            onDownloadExcel={() => downloadListPackage()}
          />
        </FormProvider>
        {download && <LoadingModal message="Descargando archivo, por favor espere..." />}
      </>
    )
  }
  return null
}
