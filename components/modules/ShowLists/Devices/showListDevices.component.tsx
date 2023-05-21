/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import dayjs from 'dayjs'
import router from 'next/router'
import { useFormContext } from 'react-hook-form'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { InputText } from 'components/atoms/inputs/InputText'
import TableDevices from 'components/molecules/Tables/TableDevices/tableDevices.container'
import {
  DataRow,
  FormFilterProps,
} from 'components/molecules/Tables/TableDevices/tableDevices.model'
import { DevicesResponse } from 'services/models/devices/response.model'
import { DevicesParams } from 'services/modules/devices.module'

import { ShowlistDevicesLocalStyles } from './showListDevices.styles'

type FormShowListDevicesProps = {
  dataTable?: DevicesResponse['getDevices']
  onDelete: (id: number) => void
  subTitle: string
  dataTitle: {
    id: number
    subs: string
  }
  dataTypeVendor: InputSelectOption[]
  onChangeFilters: (filters: DevicesParams) => unknown
  isLoading: boolean
  onDownloadExcel?: () => Promise<void>
}

const { colors } = theme
export const ShowListDevicesComponent = ({
  dataTitle,
  dataTable,
  onDelete,
  subTitle,
  dataTypeVendor,
  onChangeFilters,
  isLoading,
  onDownloadExcel,
}: FormShowListDevicesProps) => {
  const { id, subs } = dataTitle
  const methods = useFormContext<FormFilterProps>()

  const [filters, setFilters] = useState<DevicesParams>({
    searchQuery: undefined,
    vendor: undefined,
    pageNumber: 0,
  })
  const sendFilters = () => {
    onChangeFilters({
      searchQuery: filters?.searchQuery,
      vendor: filters?.vendor,
    })
  }

  const formatData = (content: DevicesResponse['getDevices']) => {
    const newData: DataRow[] = content.content.map((item) => ({
      id: item.id,
      installationDate: dayjs(item.installationDate).format('DD/MM/YYYY'),
      uuid: item.uuid,
      serial: item.serialNumber,
      vendor: item.vendor,
    }))
    return newData
  }

  useEffect(() => {
    const devices = methods.watch((value) => {
      setFilters({
        searchQuery: value?.searchQuery,
        vendor: value.vendor?.name,
      })
    })
    return () => devices.unsubscribe()
  }, [methods.watch])

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if ((filters || !filters) && filters?.searchQuery !== undefined) {
        sendFilters()
      }
    }, 1000)
    return () => clearInterval(delaySearch)
  }, [filters])

  return (
    <>
      <section className="devices-header">
        <div>
          <button type="button" onClick={() => router.back()} className="icon-back">
            <ArrowBackIcon sx={{ fontSize: 37 }} />
          </button>
        </div>
        <div className="hearder-text">
          <div className="headerSubtitle">
            <Typography color={colors.neutrals[400]} className="container-subtitles" variant="s1">
              Suscripción
            </Typography>
          </div>
          <div className="header-title">
            <Typography color={colors.primary[500]} variant="h5" weight="bold">
              #{id} - {subs}
            </Typography>
          </div>
        </div>
      </section>

      <section className="devices-container">
        <div className="container-titles">
          <div className="devices-grid">
            <div className="devices-padding">
              <Typography color={colors.primary[500]} variant="h5" weight="bold">
                Dispositivos
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} className="container-subtitles" variant="s1">
              {subTitle}
            </Typography>
          </div>
          {!!dataTable?.content.length && (
            <Button
              size="medium"
              variant="outlined"
              icon={<DownloadOutlined />}
              iconPosition="left"
              onClick={onDownloadExcel}>
              Descargar Excel
            </Button>
          )}
        </div>

        {/* Filters section  */}
        <div className="filters-content">
          <div className="filters-input">
            <div className="filters-padding">
              <Typography color={colors.neutrals[300]} variant="label">
                buscar
              </Typography>
            </div>
            <InputText name="searchQuery" placeholder="Buscar por UUID o Serial" withClear />
          </div>
          <div className="filters-select">
            <div className="filters-padding">
              <Typography color={colors.neutrals[300]} variant="label">
                Fabricante
              </Typography>
            </div>

            <InputSelect name="vendor" options={dataTypeVendor} placeholder="Todos" withClear />
          </div>
        </div>
        {dataTable !== undefined && (
          <TableDevices
            rows={formatData(dataTable)}
            onDeleteDevice={onDelete}
            pageSize={(rowPerPage) => onChangeFilters({ ...filters, pageSize: rowPerPage })}
            activePage={dataTable.number}
            totalElements={dataTable.totalElements}
            pageChange={(newPage) => onChangeFilters({ ...filters, pageNumber: newPage })}
            isLoading={isLoading}
          />
        )}
      </section>
      <style jsx>{ShowlistDevicesLocalStyles}</style>
    </>
  )
}
