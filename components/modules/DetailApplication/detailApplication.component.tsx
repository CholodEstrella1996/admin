import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'

import DetailsMaterial from 'components/molecules/DetailsMaterial'
import FormNewEditMaterial from 'components/molecules/FormNewEditMaterial'
import { ApplicationForm } from 'components/molecules/forms/newAndEdit/Application'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TabLanguage from 'components/molecules/TabLanguage/tabLanguage.component'
import TableTitle1 from 'components/molecules/TableTitle1'
import { ApplicationMaterials } from 'services/models/applicationMaterial.model'
import { ApplicationTechnical } from 'services/models/applicationTechnical.model'
import { ApiResponseTopicLearningUnits } from 'services/models/book.model'
import { Content } from 'utils/models/modelsBase'
import { StoreData } from 'utils/models/reactFormFieldsTabs'

import { LearningUnitsAssociateComponent } from './components/learningUnitsAssociate.component'
import { TechnicalApplicationComponent } from './components/technicalApplication.component'
import { TechnicalDetailTitles, TextContent } from './detailApplication.model'
import { DetailAppGlobalStyles, DetailAppLocalStyles } from './detailApplication.styles'

const { colors } = theme

type Props = {
  storeApp: StoreData
  dataTabs: Content[]
  technicalDetail?: ApplicationTechnical
  learningUnits?: ApiResponseTopicLearningUnits
  appMaterials?: ApplicationMaterials
  subtitleMaterial: string
  onDeleteMaterial: (id: number) => void
  appTitle?: string
  textContent: TextContent
  technicalDetailTitles: TechnicalDetailTitles
  idApplication: number
  applicationType: string
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  onRowsPaginationChange?: (rowsPerPage: number) => void
}

export const DetailApplicationComponent = ({
  storeApp,
  dataTabs,
  technicalDetail,
  learningUnits,
  appMaterials,
  subtitleMaterial,
  onDeleteMaterial,
  appTitle,
  textContent,
  technicalDetailTitles,
  idApplication,
  applicationType,
  onPageChange,
  onRowsPaginationChange,
}: Props) => {
  const { name, visible, color, price, icon } = storeApp
  const [isOpen, setIsOpen] = useState(false)
  const [isEditApplication, setIsEditApplication] = useState(false)
  const [isNewForm, setIsNewForm] = useState(false)
  const [isDetails, setIsDetails] = useState(false)
  const [idMaterial, setIdMaterial] = useState(0)

  const dataStore = {
    name,
    visible,
    price,
    color: color ?? undefined,
    iconUrl: icon.url,
  }

  return (
    <div className="detailApp__container" style={{ '--color': 'white' }}>
      <div className="detailApp__header">
        <Typography variant="s2" color={colors.neutrals[400]} className="headerLabel">
          {textContent.name}
        </Typography>
        <div className="detailApp__title">
          <Typography variant="h5" color={colors.primary[500]} weight="bold">
            {appTitle}
          </Typography>
          <Button size="medium" onClick={() => setIsEditApplication(true)}>
            {textContent.buttonText}
          </Button>
        </div>
      </div>

      <DropDownCard1 title="Administración del Store" isOpen colorTitle={colors.primary[500]}>
        <StoreAdmin sectionDiponibility sectionIcon sectionPrice data={dataStore} />
      </DropDownCard1>

      <DropDownCard1 title="Información de la Aplicación" isOpen colorTitle={colors.primary[500]}>
        <TabLanguage
          variant="title-description-chip"
          apiData={dataTabs}
          titles={{
            name: 'Nombre de la aplicación *',
            description: 'Descripción de la aplicación *',
            attachChipFile: 'Palabras clave',
          }}
        />
      </DropDownCard1>

      {applicationType === 'laboratory' && (
        <DropDownCard1 title="Unidades de aprendizaje" isOpen colorTitle={colors.primary[500]}>
          <LearningUnitsAssociateComponent
            learningUnitsAssociate={learningUnits}
            subtitle={textContent.learningSubtitle}
            subtitleColor={colors.neutrals[300]}
            buttonText={textContent.learningAdd}
            iconColor={colors.primary[500]}
            parentId={String(idApplication)}
          />
        </DropDownCard1>
      )}

      <DropDownCard1
        title="Datos técnicos de la aplicación"
        isOpen
        colorTitle={colors.primary[500]}>
        <TechnicalApplicationComponent
          idApplication={idApplication}
          technicalDetail={technicalDetail}
          technicalDetailTitles={technicalDetailTitles}
        />
      </DropDownCard1>

      <TableTitle1
        title="Materiales"
        subtitle={subtitleMaterial}
        content={appMaterials}
        columns={[
          { id: 'name', label: 'Nombre', width: '30%' },
          { id: 'description', label: 'Descripción', width: '60%' },
        ]}
        buttonText="Agregar nuevo material"
        onClick={() => {
          setIsOpen(true)
          setIsNewForm(true)
        }}
        onEdit={(id) => {
          setIsNewForm(false)
          setIdMaterial(id)
          setIsOpen(true)
        }}
        onDetails={(id) => {
          setIsDetails(true)
          setIdMaterial(id)
        }}
        onDelete={(id) => onDeleteMaterial(id)}
        pageChange={onPageChange}
        rowsPaginationChange={onRowsPaginationChange}
      />
      {isDetails && <DetailsMaterial idMaterial={idMaterial} onClose={() => setIsDetails(false)} />}

      {isOpen && (
        <FormNewEditMaterial
          idMaterial={idMaterial}
          idApplication={idApplication}
          isNewForm={isNewForm}
          onClose={() => setIsOpen(false)}
        />
      )}

      {isEditApplication && (
        <ApplicationForm
          applicationId={idApplication}
          isNewForm={false}
          onClose={() => setIsEditApplication(false)}
        />
      )}

      <style jsx>{DetailAppLocalStyles}</style>
      <style jsx global>
        {DetailAppGlobalStyles}
      </style>
    </div>
  )
}
