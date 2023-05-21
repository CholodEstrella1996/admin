import React, { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import FormNewEditEditorial from 'components/molecules/FormNewEditEditorial'
import FormNewEditEditorialBook from 'components/molecules/FormNewEditEditorialBook'
import InformationDescription from 'components/molecules/InformationDescription'
import StoreAdmin from 'components/molecules/StoreAdmin/storeAdmin.component'
import TableTitle1 from 'components/molecules/TableTitle1'

import { DetailEditorialProps } from './formDetailsEditorial.model'
import {
  FormDetailsEditorialLocalStyles,
  FormDetailsEditorialGlobalStyles,
} from './formDetailsEditorial.styles'

export const FormDetailsEditorialComponent = ({
  editorialName,
  storeEditorial,
  informationEditorial,
  bookData,
  subtitleBooks,
  onDeleteBook,
  idEditorial,
  onPageChange,
  onRowsPaginationChange,
}: DetailEditorialProps) => {
  const [isOpenNewBook, setIsOpenNewBook] = useState<boolean>(false)
  const [openFormBook, setOpenFormBook] = useState(false)

  const [isOpenEditEditorial, setIsOpenEditEditorial] = useState<boolean>(false)
  const [openFormEdit, setOpenFormEdit] = useState(false)
  const [idEditBook, setIdEditBook] = useState<number>()

  const router = useRouter()

  return (
    <>
      <div className="detailEditorial__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="headerButton"
            onClick={() => {
              setOpenFormEdit(false)
              setIsOpenEditEditorial(true)
            }}>
            Editar
          </Button>

          <Typography variant="s2" color={theme.colors.neutrals[400]} className="labelEditorial">
            Editorial
          </Typography>

          <Typography variant="h5" color={theme.colors.primary[500]} weight="bold">
            {editorialName}
          </Typography>
        </section>

        <DropDownCard1
          title="Administración del Store"
          colorTitle={theme.colors.primary[500]}
          isOpen>
          <StoreAdmin sectionDiponibility sectionIcon data={storeEditorial} />
        </DropDownCard1>

        <DropDownCard1
          title="Información de la Editorial"
          colorTitle={theme.colors.primary[500]}
          isOpen>
          <InformationDescription content1={informationEditorial} />
        </DropDownCard1>

        <TableTitle1
          title="Libros"
          subtitle={subtitleBooks}
          buttonText="Agregar nuevo libro"
          onClick={() => {
            setOpenFormBook(true)
            setIsOpenNewBook(true)
          }}
          onDelete={(id) => onDeleteBook(id)}
          onEdit={(id) => {
            setOpenFormBook(false)
            setIsOpenNewBook(true)
            setIdEditBook(id)
          }}
          content={bookData}
          columns={[
            { id: 'name', label: 'Nombre', width: '50%' },
            { id: 'area', label: 'Área', width: '20%' },
            { id: 'year', label: 'Año de publicación', width: '20%', align: 'right' },
          ]}
          onDetails={(id: number) => {
            void router.push(`/book/${id}`)
          }}
          pageChange={onPageChange}
          rowsPaginationChange={onRowsPaginationChange}
        />
      </div>

      {isOpenNewBook && (
        <FormNewEditEditorialBook
          isNewForm={openFormBook}
          idBook={idEditBook}
          idEditorial={idEditorial}
          onClose={() => setIsOpenNewBook(false)}
        />
      )}

      {isOpenEditEditorial && (
        <FormNewEditEditorial
          isNewForm={openFormEdit}
          onClose={() => setIsOpenEditEditorial(false)}
          idEditorial={idEditorial}
        />
      )}

      <style jsx>{FormDetailsEditorialLocalStyles}</style>
      <style jsx global>
        {FormDetailsEditorialGlobalStyles}
      </style>
    </>
  )
}
