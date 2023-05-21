import React, { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import FormNewEditCurriculoAssignuture from 'components/molecules/FormNewEditCurriculoAssignuture'
import FormNewEditCurriculum from 'components/molecules/FormNewEditCurriculum'
import ShowInformationDetails, {
  DataSection,
} from 'components/molecules/ShowInformationDetails/showInformationDetails.component'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TableTitle1 from 'components/molecules/TableTitle1'
import { GroupsByIdResponse } from 'services/models/groups.model'
import { TopicListResponse } from 'services/models/topic.model'

import {
  FormDetailCurriculumGlobalStyles,
  FormDetailCurriculumLocalStyles,
} from './formDetailsCurriculum.styles'

const { colors } = theme

export type FormDetailCurriculumProps = {
  tableSubTitle?: string
  dataCurriculum: GroupsByIdResponse
  dataTable?: TopicListResponse
  curriculumId: number
  onDeleteCurriculum: (id: number) => void
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  onRowsPaginationChange?: (rowsPerPage: number) => void
}

const FormDetailCurriculumComponent = ({
  tableSubTitle,
  dataCurriculum,
  dataTable,
  onDeleteCurriculum,
  curriculumId,
  onPageChange,
  onRowsPaginationChange,
}: FormDetailCurriculumProps) => {
  const [isOpenCurriculumEdit, setIsOpenCurriculumEdit] = useState(false)
  const [isOpenAssignature, setIsOpenAssignature] = useState(false)
  const [isNewForm, setIsNewForm] = useState(false)
  const [idAssignature, setIdAssignature] = useState<number>()

  const router = useRouter()
  if (!dataCurriculum) return null
  const dataCurriculumDetail: DataSection[] = [
    { idSection: 1, title: 'Nombre del currículo', data: dataCurriculum.name },
    { idSection: 2, title: 'Año de adopción', data: dataCurriculum.year },
    { idSection: 3, title: 'Descripción del currículo', data: dataCurriculum.description },
  ]

  return (
    <>
      <div className="formDetail__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="headerButton__edit"
            onClick={() => {
              setIsOpenCurriculumEdit((prevState) => !prevState)
              setIsNewForm(false)
            }}>
            Editar
          </Button>
          <Typography variant="s2" color={colors.neutrals[400]} className="headerLabel__title">
            Currículo
          </Typography>

          <Typography variant="h5" color={colors.primary[500]} weight="bold">
            {dataCurriculum.name}
          </Typography>
        </section>

        <DropDownCard1 title="Administración del Store" colorTitle={colors.primary[500]} isOpen>
          <StoreAdmin data={dataCurriculum} sectionDiponibility />
        </DropDownCard1>

        <DropDownCard1 title="Información del Currículo" colorTitle={colors.primary[500]} isOpen>
          <ShowInformationDetails infoData={dataCurriculumDetail} />
        </DropDownCard1>

        <TableTitle1
          title="Asignaturas"
          subtitle={tableSubTitle}
          buttonText="Agregar nueva asignatura"
          onClick={() => {
            setIsOpenAssignature(true)
            setIsNewForm(true)
          }}
          onDelete={(id) => onDeleteCurriculum(id)}
          onDetails={(id: number) => {
            void router.push(`/subject/${id}`)
          }}
          content={dataTable}
          columns={[
            { id: 'name', label: 'Nombre', width: '30%' },
            { id: 'description', label: 'Descripción', width: '70%' },
          ]}
          onEdit={(id: number) => {
            setIsOpenAssignature(true)
            setIsNewForm(false)
            setIdAssignature(id)
          }}
          pageChange={onPageChange}
          rowsPaginationChange={onRowsPaginationChange}
        />
      </div>

      {isOpenAssignature && (
        <FormNewEditCurriculoAssignuture
          isNewForm={isNewForm}
          onClose={() => setIsOpenAssignature(false)}
          idAssignature={idAssignature}
          parentId={curriculumId}
        />
      )}

      {isOpenCurriculumEdit && (
        <FormNewEditCurriculum
          isNewForm={isNewForm}
          idCurriculum={curriculumId}
          onClose={() => {
            setIsOpenCurriculumEdit(false)
          }}
        />
      )}

      <style jsx>{FormDetailCurriculumLocalStyles}</style>
      <style jsx global>
        {FormDetailCurriculumGlobalStyles}
      </style>
    </>
  )
}
export default FormDetailCurriculumComponent
