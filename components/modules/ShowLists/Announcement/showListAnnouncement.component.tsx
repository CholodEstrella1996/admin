/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import AddIcon from '@mui/icons-material/Add'
import { useFormContext } from 'react-hook-form'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputText } from 'components/atoms/inputs/InputText'
import {
  DataRow,
  FormFilterProps,
} from 'components/molecules/Tables/TableAnnouncement/tableAnnouncement.model'

import { AnnouncementResponse } from '../../../../services/models/announcement/response.model'
import { AnnouncementDetaliContainer } from '../../../molecules/Announcement/AnnouncementDetali/AnnouncementDetali.container'
import FormNewAnnouncement from '../../../molecules/forms/new/announcement'
import TableAnnouncement from '../../../molecules/Tables/TableAnnouncement/index'
import { ShowListAnnouncementLocalStyles } from './showListAnnouncement.styles'

export type GetAnnouncementParams = {
  pageSize?: number
  pageNumber?: number
  searchQuery?: string
  recipient?: string
}

type ShowListClassroomProps = {
  dataTable?: AnnouncementResponse['getAnnouncementDetali']
  subtitle: string
  isLoading: boolean
  onChangeFilters: (filters: GetAnnouncementParams) => unknown
}

const { colors } = theme

const ShowListAnnouncementComponent = ({
  dataTable,
  subtitle,
  isLoading,
  onChangeFilters,
}: ShowListClassroomProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenAnnouncement, setIsOpenAnnouncement] = useState(false)
  const methods = useFormContext<FormFilterProps>()

  const [filters, setFilters] = useState<GetAnnouncementParams>({
    pageSize: 10,
    searchQuery: undefined,
    recipient: undefined,
  })
  const sendFilters = () => {
    onChangeFilters({
      searchQuery: filters?.searchQuery,
      recipient: filters?.recipient,
    })
  }
  const formatData = (content: AnnouncementResponse['getAnnouncementDetali']) => {
    const newData: DataRow[] = content.content.map((item) => ({
      id: item.id,
      announcement: item.announcement,
      message: item.message,
      startDate: item.startDate,
      recipeint: item.recipeint,
    }))
    return newData
  }

  useEffect(() => {
    const subscription = methods.watch((values) => {
      setFilters({
        searchQuery: values?.searchQuery,
        recipient: values?.recipient,
      })
    })
    return () => subscription.unsubscribe()
  }, [methods.watch])

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
                Anuncios
              </Typography>
            </div>
            <Typography color={colors.neutrals[400]} className="countryName__subtitle" variant="s1">
              {subtitle}
            </Typography>
          </div>
          <div className="countryEdit__button">
            <Button
              onClick={() => setIsOpenAnnouncement(true)}
              icon={<AddIcon sx={{ fontSize: 30 }} />}
              size="medium">
              Crear anuncio
            </Button>
          </div>
        </div>

        {/* Filters section  */}
        <div className="filters-content">
          <div className="filters-input">
            <div className="filters-padding">
              <Typography color={colors.neutrals[300]} variant="label">
                buscar
              </Typography>
            </div>
            <InputText name="searchQuery" placeholder="Buscar por asunto o mensaje" withClear />
          </div>
          <div className="filters-select">
            <div className="filters-padding">
              <Typography color={colors.neutrals[300]} variant="label">
                DESTINATARIO
              </Typography>
            </div>

            <InputSelect name="vendor" options={[]} placeholder="Todos" withClear />
          </div>
        </div>

        {!!dataTable && (
          <TableAnnouncement
            rows={formatData(dataTable)}
            pageSize={dataTable.size}
            activePage={dataTable.number}
            totalElements={dataTable.totalElements}
            pageChange={(newPage) => onChangeFilters({ ...filters, pageNumber: newPage })}
            isLoading={isLoading}
          />
        )}

        {isOpenForm && (
          <AnnouncementDetaliContainer isNewForm onClose={() => setIsOpenForm(false)} />
        )}

        {isOpenAnnouncement && <FormNewAnnouncement onClose={() => setIsOpenAnnouncement(false)} />}
      </section>
      <style jsx>{ShowListAnnouncementLocalStyles}</style>
    </>
  )
}
export default ShowListAnnouncementComponent
