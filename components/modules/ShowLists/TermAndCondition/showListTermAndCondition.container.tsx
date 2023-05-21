/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

import Spinner from 'components/atoms/Spinner'
import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { ResponseTermAndConditionList } from 'services/models/user/response.model'
import { GetPackagesParams } from 'services/modules/packages.module'
import userService from 'services/modules/user.module'
import { useNotification } from 'utils/hooks/notification'

import { ShowListTermAndConditionComponent } from './showListTermAndCondition.component'

export const ShowListTermAndCondition = () => {
  const methods = useForm()

  const { onError, onSuccess } = useNotification()
  const router = useRouter()

  const [subtitleTable, setSubtitleTable] = useState('')
  const [dataTable, setDataTable] = useState<ResponseTermAndConditionList>()
  const [loading, setLoading] = useState(false)
  const [download, setDownload] = useState(false)
  const [, setFiltersTable] = useState<GetPackagesParams>({
    pageSize: 10,
    type: undefined,
    pageNumber: 0,
  })

  const radioId = methods.watch()

  const deleteTermAndCondition = async (id: number) => {
    try {
      await userService.deleteTermAndCondition(id)
      void router.push(`/term_and_condition`)
      onSuccess(`Has eliminado los términos y condiciones correctamente`)
    } catch {
      onError('No logramos eliminar los términos y condiciones. Intenta nuevamente más tarde')
    }
  }

  const updateTermAndCondition = async (id: number) => {
    if (!id) return
    try {
      await userService.patchActiveVersion(id)
      void router.push('/term_and_condition')
      onSuccess('Has actualizado los términos y condiciones')
    } catch {
      onError('No se pudo actualizar los términos y condiciones, intente más tarde')
    }
  }

  const downloadListTermAndCondition = async () => {
    setDownload(true)
    try {
      await userService.downloadTermAndConditionList()
    } catch {
      onError('Hubo un error al descargar archivo de excel')
    }
    setDownload(false)
  }

  useEffect(() => {
    const getList = async () => {
      setLoading(true)
      try {
        const response = await userService.getTermsAndConditionsList()
        setDataTable(response.data)

        const amountSubtitleTable = response.data.totalElements || 0
        setSubtitleTable(
          amountSubtitleTable === 1
            ? '1 términos y condiciones cargado'
            : `${amountSubtitleTable} términos y condiciones cargados`,
        )
      } catch {
        onError('Hubo un error al obtener los datos de términos y condiciones')
      }
      setLoading(false)
    }
    void getList()
  }, [])

  useEffect(() => {
    if (!radioId) return
    void updateTermAndCondition(Number(radioId?.active))
  }, [radioId])

  return dataTable ? (
    <>
      <FormProvider {...methods}>
        <ShowListTermAndConditionComponent
          dataTable={dataTable}
          subTitle={subtitleTable}
          onDelete={(id) => void deleteTermAndCondition(id)}
          onChangeFilters={(filters) => {
            setFiltersTable(filters)
          }}
          isLoading={loading}
          onDownloadExcel={() => downloadListTermAndCondition()}
        />
      </FormProvider>
      {download && <LoadingModal message="Descargando archivo, por favor espere..." />}
    </>
  ) : (
    <Spinner />
  )
}
