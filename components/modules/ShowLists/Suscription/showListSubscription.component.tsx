/* eslint-disable react-hooks/exhaustive-deps */
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
import TableSuscriptions from 'components/molecules/Tables/TableSubscriptions'
import {
  DataRow,
  FormFilterProps,
} from 'components/molecules/Tables/TableSubscriptions/tableSubscriptions.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { GetSubscriptionsParams } from 'services/modules/subscriptions.module'

import { ShowlistSuscriptionsLocalStyles } from './showListSubscription.styles'

type ShowListSubscriptionsProps = {
  dataTable?: SubscriptionsResponse['getSubscriptions']
  subtitle: string
  isLoading: boolean
  selectsData: {
    countrys: InputSelectOption[]
    clientsType: InputSelectOption[]
    subsType: InputSelectOption[]
    statusType: InputSelectOption[]
  }

  onChangeFilters: (filters: GetSubscriptionsParams) => unknown
  onDownloadExcel?: () => Promise<void>
}
const { colors } = theme

const ShowListSuscriptionsComponent = ({
  dataTable,
  subtitle,
  isLoading,
  selectsData: selectsOptions,
  onChangeFilters,
  onDownloadExcel,
}: ShowListSubscriptionsProps) => {
  const { countrys, clientsType, subsType, statusType } = selectsOptions

  const [isOpenForm, setIsOpenForm] = useState(false)
  const methods = useFormContext<FormFilterProps>()
  const [filters, setFilters] = useState<GetSubscriptionsParams>({
    searchQuery: undefined,
    kind: undefined,
    countryId: undefined,
    pageSize: undefined,
    status: undefined,
    clientKind: undefined,
  })

  const sendFilters = () => {
    onChangeFilters({
      pageSize: filters?.pageSize,
      searchQuery: filters?.searchQuery,
      kind: filters?.kind,
      countryId: filters?.countryId,
      status: filters?.status,
      clientKind: filters?.clientKind,
    })
  }

  const formatData = (content: SubscriptionsResponse['getSubscriptions']) => {
    const newData: DataRow[] = content.content.map((item) => ({
      id: item.id,
      avatar: item.imageUrl,
      name: item.name,
      type: item.customerKind.displayName,
      mail: item.email,
      country: item.country.name,
      typeSubscription: item.kind.displayName,
      expiration: dayjs(item.endDate).isValid() ? dayjs(item.endDate).format('DD/MM/YYYY') : '',
      state: item.status,
    }))
    return newData
  }

  useEffect(() => {
    const subscription = methods.watch((values) => {
      setFilters({
        searchQuery: values?.searchQuery,
        kind: values.kind?.name,
        countryId: values.countryId?.id,
        status: values.state?.name,
        clientKind: values.clientKind?.name,
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
                Suscripciones
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} className="countryName__subtitle" variant="s1">
              {subtitle}
            </Typography>
          </div>
          <div className="subscription__button">
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
            <InputText
              label="Buscar"
              name="searchQuery"
              placeholder="Nombre, correo electrónico o teléfono."
              withClear
            />
          </div>
          <div className="filters__select">
            <InputSelect
              label="Tipo de cliente"
              name="clientKind"
              options={clientsType}
              placeholder="Todos"
              withClear
            />
          </div>
          <div className="filters__select">
            <InputSelect
              label="País"
              name="countryId"
              options={countrys}
              size="small"
              placeholder="Todos"
              withClear
              withSearch
            />
          </div>
          <div className="filters__select">
            <InputSelect
              label="Tipo de suscripción"
              name="kind"
              options={subsType}
              placeholder="Todos"
              withClear
            />
          </div>
          <div className="filters__select">
            <InputSelect
              label="Estado"
              name="state"
              options={statusType}
              placeholder="Todos"
              withClear
            />
          </div>
        </div>
        {!!dataTable && (
          <TableSuscriptions
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

        {isOpenForm && <SubscriptionForm isNewForm onClose={() => setIsOpenForm(false)} />}
      </section>
      <style jsx>{ShowlistSuscriptionsLocalStyles}</style>
    </>
  )
}

export default ShowListSuscriptionsComponent
