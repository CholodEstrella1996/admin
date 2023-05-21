/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'

import { SystemForm } from 'components/molecules/forms/newAndEdit/Systems'
import { DataRow } from 'components/molecules/Tables/TableSystem/tableSystem.model'
import { SystemResponse } from 'services/models/systems/response.model'

import TableSystem from '../../../molecules/Tables/TableSystem/tableSystem.container'
import { ShowListSystemLocalStyles } from './showListSystem.styles'

export type GetSystemParams = {
  pageSize?: number
  pageNumber?: number
  type?: string
}

type ShowListClassroomProps = {
  dataTable?: SystemResponse['getSystem']
  title: string
  subtitle: string
  isLoading: boolean
  onChangeFilters: (filters: GetSystemParams) => unknown
}

const { colors } = theme

const ShowListSystemComponent = ({
  dataTable,
  subtitle,
  isLoading,
  title,
  onChangeFilters,
}: ShowListClassroomProps) => {
  const [filters] = useState<GetSystemParams>({
    pageSize: 10,
    type: undefined,
  })
  const [isOpenForm, setIsOpenForm] = useState(false)

  const formatData = (content: SystemResponse['getSystem']) => {
    const newData: DataRow[] = content.content.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      active: item.active,
      version: item.version,
    }))
    return newData
  }

  useEffect(() => {}, [filters])

  return (
    <>
      <section className="system__container">
        <div className="system__container__titles">
          <div className="system__grid">
            <div className="system__padding">
              <Typography color={colors.primary[500]} variant="h5" weight="bold">
                {title}
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} className="countryName__subtitle" variant="s1">
              {subtitle}
            </Typography>
          </div>
          <div className="system__button">
            {!!dataTable?.content.length && (
              <Button
                size="medium"
                variant="outlined"
                icon={<DownloadOutlined />}
                iconPosition="left">
                Descargar Excel
              </Button>
            )}
            <Button
              onClick={() => setIsOpenForm(true)}
              icon={<AddIcon sx={{ fontSize: 30 }} />}
              size="medium">
              Crear nueva versión
            </Button>
          </div>
        </div>

        {!!dataTable && (
          <TableSystem
            rows={formatData(dataTable)}
            pageSize={(rowPerPage) => onChangeFilters({ ...filters, pageSize: rowPerPage })}
            activePage={dataTable.number}
            totalElements={dataTable.totalElements}
            pageChange={(newPage, rowPerPage) =>
              onChangeFilters({ ...filters, pageNumber: newPage, pageSize: rowPerPage })
            }
            isLoading={isLoading}
          />
        )}
        {isOpenForm && <SystemForm isNewForm onClose={() => setIsOpenForm(false)} />}
      </section>
      <style jsx>{ShowListSystemLocalStyles}</style>
    </>
  )
}
export default ShowListSystemComponent
