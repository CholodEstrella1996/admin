import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import FormNewEditArea from 'components/molecules/FormNewEditArea'
import FormNewEditTopic from 'components/molecules/FormNewEditTopic'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TabLanguage from 'components/molecules/TabLanguage/tabLanguage.component'
import TableTitle1 from 'components/molecules/TableTitle1'
import { TopicListResponse } from 'services/models/topic.model'
import { Content as ContentBase } from 'utils/models/modelsBase'
import { StoreData } from 'utils/models/reactFormFieldsTabs'

import { AreasStyles } from './area.styles'

type Props = {
  serviceAreas: StoreData
  dataTabs: ContentBase[]
  dataTable: TopicListResponse
  idArea: number
  onDeleteTopic: (id: number) => void
  pageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  rowsPaginationChange?: (rowsPerPage: number) => void
  tableSubtitle: string
}

const AreaComponent = ({
  serviceAreas,
  dataTabs,
  dataTable,
  idArea,
  onDeleteTopic,
  pageChange,
  rowsPaginationChange,
  tableSubtitle,
}: Props) => {
  const { name, visible, color, colorDark, colorLight, price, icon } = serviceAreas
  const router = useRouter()
  const [isOpenNewTopic, setIsOpenNewTopic] = useState<boolean>(false)
  const [isOpenEditArea, setIsOpenEditArea] = useState<boolean>(false)
  const [editId, setEditId] = useState<number>()
  const [openNewForm, setOpenNewForm] = useState(false)

  const { colors } = theme
  const dataStore = {
    visible,
    price,
    color: color ?? undefined,
    colorDark: colorDark ?? undefined,
    colorLight: colorLight ?? undefined,
    iconUrl: icon?.url,
  }

  return (
    <>
      <div className="areas-container">
        <div className="area-container__titles">
          <div className="area-grid">
            <Typography className="area-name area-name_title" variant="s2">
              Área
            </Typography>

            <Typography className="area-name_subtitle" variant="h5">
              {name}
            </Typography>
          </div>

          <div className="area-edit__button">
            <Button onClick={() => setIsOpenEditArea(true)} size="medium">
              Editar
            </Button>
          </div>
        </div>

        <DropDownCard1 title="Administración del Store" isOpen colorTitle={colors.primary[500]}>
          <StoreAdmin sectionDiponibility sectionIcon sectionColor sectionPrice data={dataStore} />
        </DropDownCard1>

        <DropDownCard1
          className="area-dropDown__TabLanguage"
          title="Información del Área"
          isOpen
          colorTitle={colors.primary[500]}>
          <TabLanguage
            variant="title-description-chip"
            apiData={dataTabs}
            titles={{
              name: 'Nombre del área',
              description: 'Descripción del área',
              attachChipFile: 'Palabras clave',
            }}
          />
        </DropDownCard1>

        <TableTitle1
          title="Temáticas"
          subtitle={tableSubtitle}
          buttonText=" Agregar nueva temática"
          onClick={() => {
            setOpenNewForm(true)
            setIsOpenNewTopic(true)
          }}
          onEdit={(id) => {
            setOpenNewForm(false)
            setIsOpenNewTopic(true)
            setEditId(id)
          }}
          onDelete={(id) => onDeleteTopic(id)}
          onDetails={(id: number) => {
            void router.push(`/topic/${id}`)
          }}
          content={dataTable}
          colorArea={serviceAreas.color ?? undefined}
          columns={[
            { id: 'iconUrl', label: '', width: '5%' },
            { id: 'name', label: 'Nombre', width: '20%' },
            { id: 'description', label: 'Descripción', width: '65%' },
          ]}
          pageChange={pageChange}
          rowsPaginationChange={rowsPaginationChange}
        />

        {isOpenNewTopic && (
          <FormNewEditTopic
            isNewForm={openNewForm}
            idArea={idArea}
            idTopic={editId}
            onClose={() => setIsOpenNewTopic(false)}
          />
        )}
        {isOpenEditArea && (
          <FormNewEditArea
            isNewForm={openNewForm}
            idEditArea={idArea}
            onClose={() => setIsOpenEditArea(false)}
          />
        )}
      </div>
      <style jsx>{AreasStyles}</style>
    </>
  )
}

export default AreaComponent
