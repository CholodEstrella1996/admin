import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'

import FormNewEditGradeTopic from 'components/molecules/FormNewEditGradeTopic'
import ShowInformationDetails, {
  DataSection,
} from 'components/molecules/ShowInformationDetails/showInformationDetails.component'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import { useGradeTopicIdContext } from 'utils/contexts/gradeTopicId.context'

import { LabsAssociateComponent } from '../FormDetailsEditorialTopic/components/labsAssociate.component'
import { FormDetailsGradeTopicProps } from './formDetailsGradeTopic.model'
import {
  FormDetailsGradeTopicLocalStyles,
  FormDetailsGradeTopicGlobalStyles,
} from './formDetailsGradeTopic.styles'

const { colors } = theme

const FormDetailsGradeTopicComponent = ({
  dataAssignature,
  idAssignature,
  dataLabsTopic,
}: FormDetailsGradeTopicProps) => {
  const [isNewForm, setIsNewForm] = useState(false)
  const [isOpenFormAssignature, setIsOpenFormAssignature] = useState(false)
  const parentId = useGradeTopicIdContext()
  if (!dataAssignature) return null

  const dataAssignatureDetail: DataSection[] = [
    { idSection: 1, title: 'Nombre del tema', data: dataAssignature.name },
    { idSection: 2, title: 'Descripción del tema', data: dataAssignature.description },
  ]

  return (
    <>
      <div className="formDetailAssignature__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="headerButton"
            onClick={() => {
              setIsNewForm(false)
              setIsOpenFormAssignature((prevState) => !prevState)
            }}>
            Editar
          </Button>
          <Typography variant="s2" color={colors.neutrals[400]} className="headerLabel">
            Tema
          </Typography>

          <Typography variant="h5" color={colors.primary[500]} weight="bold">
            {dataAssignature.name}
          </Typography>
        </section>

        <DropDownCard1 title="Administración del Store" colorTitle={colors.primary[500]} isOpen>
          <StoreAdmin data={dataAssignature} sectionDiponibility />
        </DropDownCard1>

        <DropDownCard1 title="Información del Tema" colorTitle={colors.primary[500]} isOpen>
          <ShowInformationDetails infoData={dataAssignatureDetail} />
        </DropDownCard1>

        <DropDownCard1 title="Laboratorios asociados" colorTitle={colors.primary[500]} isOpen>
          {parentId !== undefined && parentId !== '' && (
            <LabsAssociateComponent
              labsAssociate={dataLabsTopic}
              subtitle="Asocie los laboratorios relevantes para el tema"
              buttonText="Asociar"
              subtitleColor={colors.neutrals[300]}
              iconColor={colors.primary[500]}
              parentId={parentId}
            />
          )}
        </DropDownCard1>
      </div>

      {isOpenFormAssignature && (
        <FormNewEditGradeTopic
          isNewForm={isNewForm}
          onClose={() => setIsOpenFormAssignature(false)}
          idTopic={idAssignature}
        />
      )}

      <style jsx>{FormDetailsGradeTopicLocalStyles}</style>
      <style jsx global>
        {FormDetailsGradeTopicGlobalStyles}
      </style>
    </>
  )
}

export default FormDetailsGradeTopicComponent
