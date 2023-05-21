/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import dayjs from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { InputText } from 'components/atoms/inputs/InputText'
import { ClassRoomForm } from 'components/molecules/forms/newAndEdit/Classroom'
import TableClassroom from 'components/molecules/Tables/TableClassroom'
import {
  DataRow,
  FormFilterProps,
} from 'components/molecules/Tables/TableClassroom/tableClassroom.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { GetSubscriptionsParams } from 'services/modules/subscriptions.module'

import { ShowListClassroomLocalStyles } from './showListClassroom.styles'

type ShowListClassroomProps = {
  dataTable?: SubscriptionsResponse['getSubscriptionLmsLti']
  subtitle: string
  isLoading: boolean
  onChangeFilters: (filters: GetSubscriptionsParams) => unknown
  onDownloadExcel?: () => Promise<void>
}

const { colors } = theme

const ShowListClassroomComponent = ({
  dataTable,
  subtitle,
  isLoading,
  onChangeFilters,
  onDownloadExcel,
}: ShowListClassroomProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false)
  const methods = useFormContext<FormFilterProps>()

  const [filters, setFilters] = useState<GetSubscriptionsParams>({
    kind: 'classroom-manager',

    searchQuery: undefined,
  })
  const sendFilters = () => {
    onChangeFilters({
      kind: filters?.kind,
      searchQuery: filters?.searchQuery,
    })
  }
  const formatData = (content: SubscriptionsResponse['getSubscriptionLmsLti']) => {
    const newData: DataRow[] = content.content.map((item) => ({
      id: item.id,
      name: item.name,
      avatar: item.imageUrl,
      numberLicense: item.licenceNumber,
      offlineActivations: item.offlineActivations,
      allowedAccess: item.allowedAccess,
      startDate: dayjs(item.startDate).isValid() ? dayjs(item.startDate).format('DD/MM/YYYY') : '',
      expiration: dayjs(item.endDate).isValid() ? dayjs(item.endDate).format('DD/MM/YYYY') : '',
      status: item.status,
    }))
    return newData
  }

  useEffect(() => {
    const subscription = methods.watch((values) => {
      setFilters({
        kind: 'classroom-manager',
        searchQuery: values?.searchQuery,
      })
    })

    return () => subscription.unsubscribe()
  }, [methods.watch('searchQuery')])

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (filters || !filters) {
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
                Licencias Gestor Aula
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} className="countryName__subtitle" variant="s1">
              {subtitle}
            </Typography>
          </div>
          <div className="classroom__button">
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
              Agregar nueva licencia
            </Button>
          </div>
        </div>

        {/* Filters section  */}
        <div className="subscription_filters_content">
          <div className="filters__input">
            <InputText
              label="Buscar"
              name="searchQuery"
              icon={<SearchOutlinedIcon />}
              placeholder="Buscar por nombre de cliente o número de licencia"
              withClear
            />
          </div>
        </div>

        {!!dataTable && (
          <TableClassroom
            rows={formatData(dataTable)}
            pageSize={dataTable.size}
            activePage={dataTable.number}
            totalElements={dataTable.totalElements}
            pageChange={(newPage) => onChangeFilters({ ...filters, pageNumber: newPage })}
            isLoading={isLoading}
          />
        )}

        {isOpenForm && <ClassRoomForm isNewForm onClose={() => setIsOpenForm(false)} />}
      </section>
      <style jsx>{ShowListClassroomLocalStyles}</style>
    </>
  )
}
export default ShowListClassroomComponent
