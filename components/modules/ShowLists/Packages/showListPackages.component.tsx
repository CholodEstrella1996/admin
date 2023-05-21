import React, { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'

import { PackageForm } from 'components/molecules/forms/newAndEdit/Packages'
import TablePackage from 'components/molecules/Tables/TablePackages'
import { DataRow } from 'components/molecules/Tables/TablePackages/tablePackage.model'
import { PackageResponse } from 'services/models/packages/response.model'
import { GetPackagesParams } from 'services/modules/packages.module'

import { ShowlistPackagesLocalStyles } from './showListPackages.styles'

type FormShowListDevicesProps = {
  dataTable?: PackageResponse['getStore']
  onDelete: (id: number) => void
  subTitle: string
  isLoading: boolean
  onChangeFilters: (filters: GetPackagesParams) => unknown
  onDownloadExcel?: () => Promise<void>
}

const { colors } = theme
export const ShowListPackagesComponent = ({
  dataTable,
  onDelete,
  subTitle,
  onChangeFilters,
  isLoading,
  onDownloadExcel,
}: FormShowListDevicesProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false)

  const [filters] = useState<GetPackagesParams>({
    type: 'saleable',
    pageNumber: 0,
    pageSize: 10,
  })

  const formatData = (content: PackageResponse['getStore']) => {
    const newData: DataRow[] = content.content.map((item) => ({
      id: item.id,
      iconUrl: item.icon?.url,
      name: item.name,
      description: item.description,
    }))
    return newData
  }

  return (
    <>
      <section className="package-container">
        <div className="package__container__titles">
          <div className="package__grid">
            <div className="package__padding">
              <Typography color={colors.primary[500]} variant="h5" weight="bold">
                Paquetes
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} className="countryName__subtitle" variant="s1">
              {subTitle}
            </Typography>
          </div>
          <div className="package__button">
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
            <Button
              onClick={() => setIsOpenForm(true)}
              icon={<AddIcon sx={{ fontSize: 30 }} />}
              size="medium">
              Crear nuevo paquete
            </Button>
          </div>
        </div>
        {isOpenForm && <PackageForm isNewForm onClose={() => setIsOpenForm(false)} />}

        {dataTable !== undefined && (
          <TablePackage
            rows={formatData(dataTable)}
            onDeletePackage={onDelete}
            pageSize={(rowPerPage) => onChangeFilters({ ...filters, pageSize: rowPerPage })}
            activePage={dataTable.number}
            totalElements={dataTable.totalElements}
            pageChange={(newPage, rowPerPage) =>
              onChangeFilters({ ...filters, pageNumber: newPage, pageSize: rowPerPage })
            }
            isLoading={isLoading}
          />
        )}
      </section>
      <style jsx>{ShowlistPackagesLocalStyles}</style>
    </>
  )
}
