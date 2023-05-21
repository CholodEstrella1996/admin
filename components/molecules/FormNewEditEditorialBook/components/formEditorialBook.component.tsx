/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { InputText } from 'components/atoms/inputs/InputText'
import { StoreAdmin } from 'components/molecules/forms/components/StoreAdmin'
import { ApiResponseBook } from 'services/models/book.model'
import { Options } from 'utils/models/reactFormFieldsTabs'

import {
  FormNewEditEditorialBookGlobalStyles,
  FormNewEditEditorialBookLocalStyles,
} from '../formNewEditEditorialBook.styles'

const { colors } = theme

type FormEditorialBookProps = {
  selectArea?: Options[]
  selectGrade?: Options[]
  selectLevel?: Options[]
  dataBook?: ApiResponseBook
}

const FormEditorialBook = ({
  selectArea,
  selectGrade,
  selectLevel,
  dataBook,
}: FormEditorialBookProps) => {
  const minYear = 1000
  const maxYear = new Date().getFullYear()

  const { watch, setValue } = useFormContext()

  const watchedValue = watch('bookLevel') as InputSelectOption | undefined
  const bookYear = watch('bookYearPublication') as number
  const valueBookLevel = Number(watchedValue?.id)
  const highLevelId = 10

  useEffect(() => {
    if (valueBookLevel < highLevelId || Number.isNaN(valueBookLevel)) return

    setValue('bookGrade', undefined)
  }, [watchedValue])

  useEffect(() => {
    if (bookYear <= 0) {
      setValue('bookYearPublication', undefined)
    }
  }, [bookYear])

  if (!dataBook) return null

  return (
    <>
      <div className="formEditorialBook__container">
        <div className="formEditorialBook__content">
          <Typography color={colors.primary[500]} variant="s1">
            Información del Libro
          </Typography>

          <InputText
            name="bookTitle"
            label="Título del libro"
            rules={{ required: true, maxLength: 50 }}
          />

          {selectArea && (
            <InputSelect
              name="bookArea"
              label="Área del libro"
              options={selectArea}
              rules={{ required: true }}
            />
          )}

          <div className="formEditorialBook__multiple-inputs">
            {selectLevel && (
              <InputSelect
                name="bookLevel"
                label="Nivel"
                options={selectLevel}
                rules={{ required: true }}
                menuPosition="top"
              />
            )}

            {selectGrade && (
              <InputSelect
                name="bookGrade"
                label="Grado"
                options={selectGrade}
                rules={
                  valueBookLevel < highLevelId || Number.isNaN(valueBookLevel)
                    ? { required: true }
                    : { required: false, disabled: true }
                }
                menuPosition="top"
              />
            )}
          </div>

          <div className="formEditorialBook__multiple-inputs">
            <InputText
              type="number"
              name="bookYearPublication"
              label="Año de publicación"
              rules={{
                required: true,
                min: {
                  value: minYear,
                  message: 'El valor es muy pequeño para el año de publicación',
                },
                max: {
                  value: maxYear,
                  message: 'El valor es mayor al año actual',
                },
              }}
            />

            <InputText name="bookEdition" label="Edición" rules={{ maxLength: 50 }} />
          </div>
        </div>

        <Divider orientation="vertical" flexItem />

        <div className="formEditorialBook__visible">
          <StoreAdmin inputs={[{ type: 'disponibility', name: 'bookDisponibility' }]} />
        </div>
      </div>

      <style jsx>{FormNewEditEditorialBookLocalStyles}</style>
      <style jsx global>
        {FormNewEditEditorialBookGlobalStyles}
      </style>
    </>
  )
}

export default FormEditorialBook
