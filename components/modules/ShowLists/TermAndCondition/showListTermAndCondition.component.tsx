import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'

import FormTermsCondition from 'components/molecules/FormTermsConditions'
import TableTermAndCondition from 'components/molecules/Tables/TableTermAndCondition'
import { DataRow } from 'components/molecules/Tables/TableTermAndCondition/tableTermAndCondition.model'
import { ResponseTermAndConditionList } from 'services/models/user/response.model'
import { GetPackagesParams } from 'services/modules/packages.module'

import { ShowlistTermAndConditionLocalStyles } from './showListTermAndCondition.styles'

type ShowListTermAndConditionProps = {
  dataTable: ResponseTermAndConditionList
  onDelete: (id: number) => void
  subTitle: string
  isLoading: boolean
  onChangeFilters: (filters: GetPackagesParams) => unknown
  onDownloadExcel?: () => Promise<void>
}

const { colors } = theme

export const ShowListTermAndConditionComponent = (props: ShowListTermAndConditionProps) => {
  const { dataTable, subTitle, isLoading, onDelete, onChangeFilters, onDownloadExcel } = props

  const [isOpenForm, setIsOpenForm] = useState(false)
  const [filters] = useState<GetPackagesParams>({
    pageSize: undefined,
    type: undefined,
    pageNumber: 0,
  })

  const formatData = (content: ResponseTermAndConditionList) => {
    const newData: DataRow[] = content.content.map((item) => ({
      id: item?.id,
      title: item?.title,
      version: item?.version,
      active: item?.active,
    }))
    return newData
  }

  return (
    <>
      <section className="termAndCondition-container">
        <div className="termAndCondition__container__titles">
          <div className="termAndCondition__grid">
            <div className="termAndCondition__padding">
              <Typography color={colors.primary[500]} variant="h5" weight="bold">
                Términos y condiciones
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} variant="s1">
              {subTitle}
            </Typography>
          </div>
          <div className="termAndCondition__button">
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
              Agregar términos y condiciones
            </Button>
          </div>
        </div>

        {dataTable !== undefined && (
          <TableTermAndCondition
            rows={formatData(dataTable)}
            deleteTermAndCondition={onDelete}
            pageSize={dataTable.size}
            activePage={dataTable.number}
            totalElements={dataTable.totalElements}
            pageChange={(newPage) => onChangeFilters({ ...filters, pageNumber: newPage })}
            isLoading={isLoading}
          />
        )}
      </section>

      {isOpenForm && <FormTermsCondition isNewForm onClose={() => setIsOpenForm(false)} />}

      <style jsx>{ShowlistTermAndConditionLocalStyles}</style>
    </>
  )
}
