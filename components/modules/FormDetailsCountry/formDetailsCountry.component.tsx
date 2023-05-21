import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import FormNewEditCountry from 'components/molecules/FormNewEditCountry'
import FormNewEditCurriculum from 'components/molecules/FormNewEditCurriculum'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TabLanguage from 'components/molecules/TabLanguage/tabLanguage.component'
import TableTitle1 from 'components/molecules/TableTitle1'
import { GroupsByIdResponse } from 'services/models/groups.model'
import { TopicListResponse } from 'services/models/topic.model'
import { Content } from 'utils/models/modelsBase'

import { FormDetailsCountryLocalStyles } from './formDetailsCountry.styles'

type Props = {
  countryId: number
  serviceCountry: GroupsByIdResponse
  dataTabs: Content[]
  dataTable: TopicListResponse
  onDeleteCountry: (id: number) => void
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  onRowsPaginationChange?: (rowsPerPage: number) => void
  tableSubtitle: string
}
const { colors } = theme
const FormDetailsCountryComponent = ({
  countryId,
  serviceCountry,
  dataTabs,
  dataTable,
  onDeleteCountry,
  onPageChange,
  onRowsPaginationChange,
  tableSubtitle,
}: Props) => {
  const { name, visible, iconUrl } = serviceCountry
  const router = useRouter()
  const [isOpenNewCurriculum, setIsOpenNewCurriculum] = useState(false)
  const [isOpenEditCountry, setIsOpenEditCountry] = useState(false)
  const [editId, setEditId] = useState<number>()
  const [openNewForm, setOpenNewForm] = useState(false)

  const dataStore = {
    visible,
    iconUrl,
  }

  return (
    <>
      <div className="country__container">
        <div className="country__container--titles">
          <div className="country__grid">
            <Typography
              color={colors.neutrals[400]}
              className="country__name countryName__title"
              variant="s2">
              País
            </Typography>

            <Typography color={colors.primary[500]} className="countryName__subtitle" variant="h5">
              {name}
            </Typography>
          </div>

          <div className="countryEdit__button">
            <Button
              onClick={() => {
                setOpenNewForm(false)
                setIsOpenEditCountry(true)
              }}
              size="medium">
              Editar
            </Button>
          </div>
        </div>

        <DropDownCard1 title="Administración del Store" isOpen colorTitle={colors.primary[500]}>
          <StoreAdmin sectionDiponibility sectionIcon data={dataStore} />
        </DropDownCard1>

        <DropDownCard1 title="Información del País" isOpen colorTitle={colors.primary[500]}>
          <TabLanguage
            variant="simple-country"
            apiData={dataTabs}
            titles={{
              name: 'Nombre del país',
            }}
          />
        </DropDownCard1>

        <TableTitle1
          title="Currículos"
          subtitle={tableSubtitle}
          buttonText="Agregar nuevo currículo"
          onClick={() => {
            setOpenNewForm(true)
            setIsOpenNewCurriculum(true)
          }}
          onEdit={(id) => {
            setOpenNewForm(false)
            setIsOpenNewCurriculum(true)
            setEditId(id)
          }}
          onDelete={(id) => onDeleteCountry(id)}
          onDetails={(id: number) => {
            void router.push(`/curriculum/${id}`)
          }}
          content={dataTable}
          columns={[
            { id: 'name', label: 'Nombre', width: '70%' },
            { id: 'year', label: 'Año de adopción', width: '30%' },
          ]}
          pageChange={onPageChange}
          rowsPaginationChange={onRowsPaginationChange}
        />

        {isOpenNewCurriculum && (
          <FormNewEditCurriculum
            isNewForm={openNewForm}
            idCurriculum={editId}
            parentId={countryId}
            onClose={() => {
              setIsOpenNewCurriculum(false)
            }}
          />
        )}

        {isOpenEditCountry && (
          <FormNewEditCountry
            isNewForm={openNewForm}
            countryId={countryId}
            onClose={() => {
              setIsOpenEditCountry(false)
            }}
          />
        )}
      </div>
      <style jsx>{FormDetailsCountryLocalStyles}</style>
    </>
  )
}

export default FormDetailsCountryComponent
