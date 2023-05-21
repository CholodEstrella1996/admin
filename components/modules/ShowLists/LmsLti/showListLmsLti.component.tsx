/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import dayjs from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { InputText } from 'components/atoms/inputs/InputText'
import { SubscriptionForm } from 'components/molecules/forms/newAndEdit/Subscription'
import TableLmsLti from 'components/molecules/Tables/TableLmsLti'
import { DataRow, FormFilterProps } from 'components/molecules/Tables/TableLmsLti/tableLmsLti.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { GetSubscriptionsParams } from 'services/modules/subscriptions.module'

import { ShowListLmsLtiLocalStyles } from './showListLmsLti.styles'

type ShowListSubscriptionsProps = {
  dataTable?: SubscriptionsResponse['getSubscriptionLmsLti']
  subtitle: string
  isLoading: boolean
  selectsData: {
    statusType: InputSelectOption[]
  }

  onChangeFilters: (filters: GetSubscriptionsParams) => unknown
  onDownloadExcel?: () => Promise<void>
}
const { colors } = theme

const ShowListLmsLtiComponent = ({
  dataTable,
  subtitle,
  isLoading,
  selectsData: selectsOptions,
  onChangeFilters,
  onDownloadExcel,
}: ShowListSubscriptionsProps) => {
  const { statusType } = selectsOptions

  const [isOpenForm, setIsOpenForm] = useState(false)
  const methods = useFormContext<FormFilterProps>()
  const [filters, setFilters] = useState<GetSubscriptionsParams>({
    kind: 'lms-lti',
    searchQuery: undefined,

    status: undefined,
    support: undefined,
  })

  const sendFilters = () => {
    onChangeFilters({
      kind: filters.kind,
      searchQuery: filters?.searchQuery,
      status: filters?.status,
      support: filters?.support,
    })
  }

  const formatData = (content: SubscriptionsResponse['getSubscriptionLmsLti']) => {
    const newData: DataRow[] = content.content.map((item) => ({
      id: item.id,
      name: item.name,
      avatar: item.imageUrl,
      userQuantity: String(item.userCount),
      numberLicense: item.licenceNumber,
      status: item.status,
      support: item.ltiSupportForAndroid,
      expiration: dayjs(item.endDate).isValid() ? dayjs(item.endDate).format('DD/MM/YYYY') : '',
    }))
    return newData
  }

  useEffect(() => {
    const subscription = methods.watch((values) => {
      setFilters({
        kind: 'lms-lti',
        searchQuery: values?.searchQuery,
        status: values?.status?.name,
        support: values?.support?.name,
      })
    })
    return () => subscription.unsubscribe()
  }, [methods.watch])

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if ((filters || !filters) && filters?.searchQuery !== undefined) {
        sendFilters()
      }
    }, 1000)
    return () => clearTimeout(delaySearch)
  }, [filters])

  return (
    <>
      <section className="subscription__container">
        <div className="subscription__container__titles">
          <div className="subscription__grid">
            <div className="subscription__padding">
              <Typography color={colors.primary[500]} variant="h5" weight="bold">
                Suscripciones LMS/LTI
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} className="countryName__subtitle" variant="s1">
              {subtitle}
            </Typography>
          </div>
          <div className="lms-lti__button">
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
              Agregar nueva suscripción
            </Button>
          </div>
        </div>
        {/* Filters section  */}
        <div className="subscription_filters_content">
          <div className="filters__input">
            <InputText label="Buscar" name="searchQuery" placeholder="Nombre" withClear />
          </div>
          <div className="filters__select">
            <InputSelect
              label="Estado"
              name="status"
              options={statusType}
              placeholder="Todos"
              withClear
            />
          </div>
          <div className="filters__select">
            <InputSelect
              label="soporte"
              name="support"
              options={[
                { id: 1, name: 'true', displayName: 'Si' },
                { id: 2, name: 'false', displayName: 'No' },
              ]}
              placeholder="Todos"
              withClear
            />
          </div>
        </div>
        {!!dataTable && (
          <TableLmsLti
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
        {isOpenForm && (
          <SubscriptionForm isNewForm isLmsLti institution onClose={() => setIsOpenForm(false)} />
        )}
      </section>
      <style jsx>{ShowListLmsLtiLocalStyles}</style>
    </>
  )
}

export default ShowListLmsLtiComponent
