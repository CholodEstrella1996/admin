import React, { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import FormNewEditEditorialBook from 'components/molecules/FormNewEditEditorialBook'
import FormNewEditEditorialTopic from 'components/molecules/FormNewEditEditorialTopic'
import InformationDescription from 'components/molecules/InformationDescription'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TableTitle1 from 'components/molecules/TableTitle1'

import { DetailBookTable, FormDetailEditorialBookProps } from './formDetailEditorialBook.model'
import {
  FormDetailEditorialBookGlobalStyles,
  FormDetailEditorialBookLocalStyles,
} from './formDetailEditorialBook.styles'

const { colors } = theme

const FormDetailEditorialBookComponent = ({
  tableSubTitle,
  idBook,
  dataBook,
  dataTable,
  onDeleteBookTopic,
  idEditorial,
  onPageChange,
  onRowsPaginationChange,
}: FormDetailEditorialBookProps) => {
  const [isOpenBookEdit, setIsOpenBookEdit] = useState(false)

  const [isOpenTopic, setIsOpenTopic] = useState(false)
  const [openNewForm, setOpenNewForm] = useState(false)
  const [idTopic, setIdTopic] = useState<number>()

  const router = useRouter()

  if (!dataBook) return null
  const dataBookDetail: DetailBookTable[] = [
    { id: 1, name: 'Título del libro', description: dataBook?.name },
    { id: 2, name: 'Area del libro', description: dataBook?.area?.name },
    {
      id: 4,
      name: 'Nivel',
      description:
        dataBook?.categories.length > 1
          ? dataBook?.categories[1]?.tags[0]?.name
          : dataBook?.categories[0]?.tags[0]?.name,
    },
    {
      id: 5,
      name: 'Grado',
      description: dataBook?.categories.length > 1 ? dataBook?.categories[0]?.tags[0]?.name : '-',
    },
    { id: 6, name: 'Año de publicación', description: String(dataBook?.year) },
    { id: 3, name: 'Edición', description: String(dataBook?.edition) },
  ]

  return (
    <>
      <div className="formDetail__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="headerButton"
            onClick={() => setIsOpenBookEdit(!isOpenBookEdit)}>
            Editar
          </Button>
          <Typography variant="s2" color={colors.neutrals[400]} className="headerLabel">
            Libro
          </Typography>

          <Typography variant="h5" color={colors.primary[500]} weight="bold">
            {dataBook.name}
          </Typography>
        </section>

        <DropDownCard1 title="Administración del Store" colorTitle={colors.primary[500]} isOpen>
          <StoreAdmin data={dataBook} sectionDiponibility />
        </DropDownCard1>

        <DropDownCard1 title="Información del Libro" colorTitle={colors.primary[500]} isOpen>
          <InformationDescription content1={dataBookDetail} />
        </DropDownCard1>

        <TableTitle1
          title="Temas"
          subtitle={tableSubTitle}
          buttonText="Agregar nuevo tema"
          onClick={() => {
            setIsOpenTopic(true)
            setOpenNewForm(true)
          }}
          onDelete={(id) => onDeleteBookTopic(id)}
          onDetails={(id: number) => {
            void router.push(`/book_topic/${id}`)
          }}
          content={dataTable}
          columns={[{ id: 'name', label: 'Nombre', width: '90%' }]}
          onEdit={(id: number) => {
            setIsOpenTopic(true)
            setOpenNewForm(false)
            setIdTopic(id)
          }}
          pageChange={onPageChange}
          rowsPaginationChange={onRowsPaginationChange}
        />
      </div>
      {isOpenBookEdit && (
        <FormNewEditEditorialBook
          isNewForm={false}
          idEditorial={idEditorial}
          idBook={idBook}
          onClose={() => setIsOpenBookEdit(false)}
        />
      )}

      {isOpenTopic && (
        <FormNewEditEditorialTopic
          isNewForm={openNewForm}
          onClose={() => setIsOpenTopic(false)}
          idBook={idBook}
          idTopic={idTopic}
        />
      )}

      <style jsx>{FormDetailEditorialBookLocalStyles}</style>
      <style jsx global>
        {FormDetailEditorialBookGlobalStyles}
      </style>
    </>
  )
}
export default FormDetailEditorialBookComponent
