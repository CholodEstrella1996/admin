import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import FormNewEditCurriculumGrade from 'components/molecules/FormNewEditCurriculumGrade'
import FormNewEditGradeTopic from 'components/molecules/FormNewEditGradeTopic'
import ShowInformationDetails, {
  DataSection,
} from 'components/molecules/ShowInformationDetails/showInformationDetails.component'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TableTitle1 from 'components/molecules/TableTitle1'

import { FormDetailsCurriculumGradeProps } from './formDetailsCurriculumGrade.model'
import {
  FormDetailsCurriculumGradeGlobalStyles,
  FormDetailsCurriculumGradeLocalStyles,
} from './formDetailsCurriculumGrade.styles'

const { colors } = theme

const dataColumns = [
  { id: 'name', label: 'Nombre', width: '30%' },
  { id: 'description', label: 'Descripción', width: '70%' },
]

const FormDetailsCurriculumGradeComponent = (props: FormDetailsCurriculumGradeProps) => {
  const {
    dataGrade,
    dataTable,
    tableSubTitle,
    onDeleteTopic,
    idGrade,
    onPageChange,
    onRowsPaginationChange,
  } = props

  const [isNewForm, setIsNewForm] = useState(false)
  const [isOpenTopic, setIsOpenTopic] = useState(false)
  const [isOpenGrade, setIsOpenGrade] = useState(false)
  const [idTopic, setIdTopic] = useState<number>()

  const router = useRouter()

  const dataGradeDetail: DataSection[] = [
    { idSection: 1, title: 'Nombre del grado', data: dataGrade.name },
    { idSection: 2, title: 'Descripción del grado', data: dataGrade.description },
  ]

  return (
    <>
      <div className="formDetailGrade__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="headerButton"
            onClick={() => {
              setIsNewForm(false)
              setIsOpenGrade(true)
            }}>
            Editar
          </Button>

          <Typography variant="s2" color={colors.neutrals[400]} className="headerLabel">
            Grado
          </Typography>
          <Typography variant="h5" color={colors.primary[500]} weight="bold">
            {dataGrade.name}
          </Typography>
        </section>

        <DropDownCard1 title="Administración del Store" colorTitle={colors.primary[500]} isOpen>
          <StoreAdmin data={dataGrade} sectionDiponibility />
        </DropDownCard1>

        <DropDownCard1 title="Información del Grado" colorTitle={colors.primary[500]} isOpen>
          <ShowInformationDetails infoData={dataGradeDetail} />
        </DropDownCard1>

        <TableTitle1
          title="Temas"
          subtitle={tableSubTitle}
          content={dataTable}
          onDelete={(id: number) => onDeleteTopic(id)}
          buttonText="Agregar nuevo tema"
          onEdit={(id: number) => {
            setIsNewForm(false)
            setIsOpenTopic(true)
            setIdTopic(id)
          }}
          onClick={() => {
            setIsNewForm(true)
            setIsOpenTopic(true)
          }}
          onDetails={(id: number) => {
            void router.push(`/grade_topic/${id}`)
          }}
          columns={dataColumns}
          pageChange={onPageChange}
          rowsPaginationChange={onRowsPaginationChange}
        />
      </div>

      {isOpenTopic && (
        <FormNewEditGradeTopic
          isNewForm={isNewForm}
          onClose={() => setIsOpenTopic(false)}
          parentId={idGrade}
          idTopic={idTopic}
        />
      )}

      {isOpenGrade && (
        <FormNewEditCurriculumGrade
          isNewForm={isNewForm}
          onClose={() => setIsOpenGrade(false)}
          idGrade={idGrade}
        />
      )}

      <style jsx>{FormDetailsCurriculumGradeLocalStyles}</style>
      <style jsx global>
        {FormDetailsCurriculumGradeGlobalStyles}
      </style>
    </>
  )
}

export default FormDetailsCurriculumGradeComponent
