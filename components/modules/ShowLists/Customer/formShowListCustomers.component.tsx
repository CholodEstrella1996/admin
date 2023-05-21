/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import { useFormContext } from 'react-hook-form'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { InputText } from 'components/atoms/inputs/InputText'
import { CustomerForm } from 'components/molecules/FormNewEditCustomers'
import { CustomerResponse } from 'services/models/customers/response.model'

import TableCustomers from '../../../molecules/Tables/TableCustomers'
import {
  DataRow,
  FormFilterProps,
  SelectOptions,
} from '../../../molecules/Tables/TableCustomers/tableCustomers.model'
import { FormDetailsCustomerLocalStyles } from './formShowListCustomers.styles'

type FormShowListCustomersProps = {
  dataTable?: CustomerResponse['getCustomers']
  onDelete: (id: number) => void
  subTitle: string
  dataCountrys: SelectOptions[]
  dataTypeClients: SelectOptions[]
  onChangeFilters: (filters: FormFilterProps) => unknown
  isLoading: boolean
  onDownloadExcel?: () => Promise<void>
}
const { colors } = theme

const FormShowListCustomersComponent = ({
  dataTable,
  onDelete,
  subTitle,
  dataCountrys,
  dataTypeClients,
  onChangeFilters,
  isLoading,
  onDownloadExcel,
}: FormShowListCustomersProps) => {
  const methods = useFormContext<
    Omit<FormFilterProps, 'searchQuery' | 'kind' | 'countryId'> & {
      searchQuery?: string
      kind?: InputSelectOption
      countryId?: InputSelectOption
    }
  >()

  const [isOpenForm, setIsOpenForm] = useState(false)
  const [filters, setFilters] = useState<FormFilterProps>({
    searchQuery: undefined,
    kind: undefined,
    countryId: undefined,
    pageSize: undefined,
  })

  const sendFilters = () => {
    onChangeFilters({
      searchQuery: filters?.searchQuery,
      kind: filters?.kind,
      countryId: filters?.countryId,
    })
  }

  const formatData = (content: CustomerResponse['getCustomers']) => {
    let itemMapped: DataRow = {
      id: 0,
      name: '',
      avatar: '',
      mail: '',
      phone: '',
      country: '',
    }

    const newData: DataRow[] = content.content.map((item) => {
      if (item.kind === 'government' || item.kind === 'institution') {
        itemMapped = {
          id: item.id,
          name: item.organization?.name ?? undefined,
          avatar: item.organization?.logoUrl ?? undefined,
          type: item.displayName,
          mail: item.user.email,
          phone: item.user.phone,
          country: item.organization?.country,
        }
        return itemMapped
      }
      itemMapped = {
        id: item.id,
        name: `${item.user.firstName} ${item.user.surname}`,
        avatar: item.user?.avatarUrl ?? undefined,
        type: item.displayName,
        mail: item.user.email,
        phone: item.user.phone,
        country: item.user.country,
      }
      return itemMapped
    })

    return newData
  }

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setFilters({
        searchQuery: value?.searchQuery,
        countryId: value.countryId?.id,
        kind: value.kind?.name,
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
      <section className="customer__container">
        <div className="customer__container__titles">
          <div className="customer__grid">
            <div className="customer__padding">
              <Typography color={colors.primary[500]} variant="h5" weight="bold">
                Clientes
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} className="countryName__subtitle" variant="s1">
              {subTitle}
            </Typography>
          </div>
          <div className="customer__button">
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
              Agregar nuevo cliente
            </Button>
          </div>
        </div>

        {/* Filters section  */}
        <div className="customer_filters_content">
          <div className="filters__input">
            <div className="customer__filters__padding">
              <Typography color={colors.neutrals[300]} variant="label">
                buscar
              </Typography>
            </div>
            <InputText
              name="searchQuery"
              placeholder="Nombre, correo electrónico o teléfono."
              withClear
            />
          </div>
          <div className="filters__select__type">
            <div className="customer__filters__padding">
              <Typography color={colors.neutrals[300]} variant="label">
                Tipo de cliente
              </Typography>
            </div>

            <InputSelect name="kind" options={dataTypeClients} placeholder="Todos" withClear />
          </div>
          <div className="filters__select__country">
            <div className="customer__filters__padding">
              <Typography color={colors.neutrals[300]} variant="label">
                País
              </Typography>
            </div>

            <InputSelect
              name="countryId"
              options={dataCountrys}
              size="small"
              placeholder="Todos"
              withSearch
              withClear
            />
          </div>
        </div>
        {dataTable !== undefined && (
          <TableCustomers
            rows={formatData(dataTable)}
            deleteUser={onDelete}
            pageSize={(rowPerPage) => onChangeFilters({ ...filters, pageSize: rowPerPage })}
            activePage={dataTable.number}
            totalElements={dataTable.totalElements}
            pageChange={(newPage, rowPerPage) =>
              onChangeFilters({ ...filters, pageNumber: newPage, pageSize: rowPerPage })
            }
            isLoading={isLoading}
          />
        )}

        {isOpenForm && <CustomerForm isNewForm onClose={() => setIsOpenForm(false)} />}
      </section>
      <style jsx>{FormDetailsCustomerLocalStyles}</style>
    </>
  )
}

export default FormShowListCustomersComponent
