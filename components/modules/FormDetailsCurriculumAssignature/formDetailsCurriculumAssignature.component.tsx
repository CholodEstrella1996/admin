import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import FormNewEditCurriculoAssignuture from 'components/molecules/FormNewEditCurriculoAssignuture'
import FormNewEditCurriculumGrade from 'components/molecules/FormNewEditCurriculumGrade'
import ShowInformationDetails, {
  DataSection,
} from 'components/molecules/ShowInformationDetails/showInformationDetails.component'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TableTitle1 from 'components/molecules/TableTitle1'

import { FormDetailsCurriculumAssignatureProps } from './formDetailsCurriculumAssignature.model'
import {
  FormDetailsCurriculumAssignatureGlobalStyles,
  FormDetailsCurriculumAssignatureLocalStyles,
} from './formDetailsCurriculumAssignature.styles'

const { colors } = theme

const dataColumns = [
  { id: 'name', label: 'Nombre', width: '30%' },
  { id: 'description', label: 'Descripción', width: '70%' },
]

const FormDetailsCurriculumAssignatureComponent = ({
  dataAssignature,
  idAssignature,
  onDeleteElement,
  dataTable,
  tableSubTitle,
  onPageChange,
  onRowsPaginationChange,
}: FormDetailsCurriculumAssignatureProps) => {
  const [isNewForm, setIsNewForm] = useState(false)
  const [isOpenFormAssignature, setIsOpenFormAssignature] = useState(false)
  const [isOpenGrade, setIsOpenGrade] = useState(false)
  const [idGrade, setIdGrade] = useState<number>()
  const router = useRouter()

  if (!dataAssignature) return null

  const dataAssignatureDetail: DataSection[] = [
    { idSection: 1, title: 'Nombre de la asignatura', data: dataAssignature.name },
    { idSection: 2, title: 'Descripción de la asignatura', data: dataAssignature.description },
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
            Asignatura
          </Typography>

          <Typography variant="h5" color={colors.primary[500]} weight="bold">
            {dataAssignature.name}
          </Typography>
        </section>

        <DropDownCard1 title="Administración del Store" colorTitle={colors.primary[500]} isOpen>
          <StoreAdmin data={dataAssignature} sectionDiponibility />
        </DropDownCard1>

        <DropDownCard1 title="Información de la Asignatura" colorTitle={colors.primary[500]} isOpen>
          <ShowInformationDetails infoData={dataAssignatureDetail} />
        </DropDownCard1>

        <TableTitle1
          title="Grados"
          subtitle={tableSubTitle}
          content={dataTable}
          buttonText="Agregar nuevo grado"
          onDelete={(id: number) => {
            onDeleteElement(id)
          }}
          onClick={() => {
            setIsNewForm(true)
            setIsOpenGrade(true)
          }}
          onEdit={(id) => {
            setIsNewForm(false)
            setIsOpenGrade(true)
            setIdGrade(id)
          }}
          onDetails={(id) => {
            void router.push(`/grade/${id}`)
          }}
          columns={dataColumns}
          pageChange={onPageChange}
          rowsPaginationChange={onRowsPaginationChange}
        />
      </div>

      {isOpenGrade && (
        <FormNewEditCurriculumGrade
          isNewForm={isNewForm}
          parentId={idAssignature}
          idGrade={idGrade}
          onClose={() => setIsOpenGrade(false)}
        />
      )}

      {isOpenFormAssignature && (
        <FormNewEditCurriculoAssignuture
          isNewForm={isNewForm}
          onClose={() => setIsOpenFormAssignature(false)}
          idAssignature={idAssignature}
        />
      )}
      <style jsx>{FormDetailsCurriculumAssignatureLocalStyles}</style>
      <style jsx global>
        {FormDetailsCurriculumAssignatureGlobalStyles}
      </style>
    </>
  )
}

export default FormDetailsCurriculumAssignatureComponent
