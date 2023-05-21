import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'

import FormNewEditEditorialTopic from 'components/molecules/FormNewEditEditorialTopic'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import { useBookTopicIdContext } from 'utils/contexts/bookTopicId.context'

import { LabsAssociateComponent } from './components/labsAssociate.component'
import { FormDetailEditorialTopicProps } from './formDetailsEditorialTopic.model'
import {
  FormDetailsEditorialTopicGlobalStyles,
  FormDetailsEditorialTopicLocalStyles,
} from './formDetailsEditorialTopic.styles'

const { colors } = theme

const FormDetailsEditorialTopicComponent = (props: FormDetailEditorialTopicProps) => {
  const [isOpenTopicEdit, setIsOpenTopicEdit] = useState(false)
  const [isNewForm, setIsNewForm] = useState(false)
  const { idBookTopic, idBook, dataBookTopic, dataLabsTopic } = props
  const { name } = dataBookTopic
  const parentId = useBookTopicIdContext()
  return (
    <>
      <div className="formDetail__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="headerButton"
            onClick={() => {
              setIsNewForm(false)
              setIsOpenTopicEdit(!isOpenTopicEdit)
            }}>
            Editar
          </Button>
          <Typography variant="s2" color={colors.neutrals[400]} className="headerLabel">
            Tema
          </Typography>

          <Typography variant="h5" color={colors.primary[500]} weight="bold">
            {name}
          </Typography>
        </section>
        <DropDownCard1 title="Administración del Store" colorTitle={colors.primary[500]} isOpen>
          <StoreAdmin data={dataBookTopic} sectionDiponibility />
        </DropDownCard1>

        <DropDownCard1 title="Información del Tema" colorTitle={colors.primary[500]} isOpen>
          <Typography variant="label" color={colors.neutrals[400]}>
            Título del tema
          </Typography>
          <Typography
            weight="regular"
            variant="p2"
            color={colors.neutrals[400]}
            className="themeLabel">
            {name}
          </Typography>
        </DropDownCard1>

        <DropDownCard1 title="Laboratorios asociados" colorTitle={colors.primary[500]} isOpen>
          <LabsAssociateComponent
            buttonText="Asociar"
            subtitle="Asocie los laboratorios relevantes para el tema"
            labsAssociate={dataLabsTopic}
            subtitleColor={colors.neutrals[300]}
            iconColor={colors.primary[500]}
            parentId={parentId}
          />
        </DropDownCard1>

        {isOpenTopicEdit && (
          <FormNewEditEditorialTopic
            idTopic={idBookTopic}
            idBook={Number(idBook)}
            isNewForm={isNewForm}
            onClose={() => setIsOpenTopicEdit(!isOpenTopicEdit)}
          />
        )}
      </div>

      <style jsx>{FormDetailsEditorialTopicLocalStyles}</style>
      <style jsx global>
        {FormDetailsEditorialTopicGlobalStyles}
      </style>
    </>
  )
}

export default FormDetailsEditorialTopicComponent
