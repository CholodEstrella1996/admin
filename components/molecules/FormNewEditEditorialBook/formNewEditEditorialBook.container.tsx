/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ApiResponseBook, BookParams } from 'services/models/book.model'
import { bookService } from 'services/modules/book.module'
import { useNotification } from 'utils/hooks/notification'
import { Options } from 'utils/models/reactFormFieldsTabs'

import FormNewEditEditorialBook from './formNewEditEditorialBook.component'
import { FormNewEditEditorialBookModel } from './formNewEditEditorialBook.model'
import FormNewEditEditorialBookService from './formNewEditEditorialBook.service'

const getDefaultValues = (_dataBook: ApiResponseBook) => ({
  bookTitle: _dataBook.name,
  bookArea: { id: _dataBook.area.id, name: _dataBook.area.name },
  bookGrade:
    _dataBook.categories.length > 1
      ? {
          id: _dataBook.categories[0].tags[0].id,
          name: _dataBook.categories[0].tags[0].name,
        }
      : undefined,
  bookLevel:
    _dataBook.categories.length > 1
      ? { id: _dataBook.categories[1].tags[0].id, name: _dataBook.categories[1].tags[0].name }
      : { id: _dataBook.categories[0].tags[0].id, name: _dataBook.categories[0].tags[0].name },
  bookYearPublication: _dataBook.year,
  bookDisponibility: _dataBook.visible,
  bookEdition: _dataBook.edition,
})

type FormNewEditEditorialBookContainerProps = {
  isNewForm?: boolean
  idEditorial?: number | undefined
  idBook?: number
  onClose: () => void
}

const FormNewEditEditorialBookContainer = (props: FormNewEditEditorialBookContainerProps) => {
  // Props
  const { isNewForm = false, idEditorial = 11, onClose, idBook = 1 } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<FormNewEditEditorialBookModel>()

  // States
  const [dataBook, setDataBook] = useState<ApiResponseBook>(Object)
  const [selectArea, setSelectArea] = useState<Options[]>([])
  const [selectGrade, setSelectGrade] = useState<Options[]>([])
  const [selectLevel, setSelectLevel] = useState<Options[]>([])
  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  // Handlers
  const handleSubmit: SubmitHandler<FormNewEditEditorialBookModel> = async (data) => {
    setLoading(true)
    try {
      const responseIdNewEditBook = await FormNewEditEditorialBookService(
        data,
        isNewForm,
        idEditorial,
        idBook,
      )
      onSuccess(`Se ${isNewForm ? 'agregó' : 'actualizó'} correctamente el libro`)
      void router.push(`/book/${responseIdNewEditBook}`)
    } catch {
      onError('Error al cargar los datos del libro')
    }
    setLoading(false)
    onClose()
  }

  // Effects
  useEffect(() => {
    const getBookApiData = async () => {
      if (isNewForm && idBook !== undefined) return
      try {
        setLoading(true)
        const paramsGrade: BookParams = { category: 'grade' }
        const paramsLevel: BookParams = { category: 'level' }
        const [area, grade, level] = await Promise.all([
          bookService.getBookSelectArea(),
          bookService.getBookSelect(paramsGrade),
          bookService.getBookSelect(paramsLevel),
        ])
        setSelectArea(area.data.content)
        setSelectLevel(level.data.content)
        setSelectGrade(grade.data.content)

        const respDataBook = await bookService.getBook(idBook)
        setDataBook(respDataBook.data)
        if (!respDataBook) return
        const dataSetted = getDefaultValues(respDataBook.data)
        reset(dataSetted)
      } catch {
        onError('Error al cargar los datos')
        onClose()
      }
      setLoading(false)
    }
    if (!isNewForm) void getBookApiData()

    const getBookSelects = async () => {
      if (!isNewForm) return
      try {
        setLoading(true)
        const paramsGrade: BookParams = { category: 'grade' }
        const paramsLevel: BookParams = { category: 'level' }
        const [area, grade, level] = await Promise.all([
          bookService.getBookSelectArea(),
          bookService.getBookSelect(paramsGrade),
          bookService.getBookSelect(paramsLevel),
        ])
        setSelectArea(area.data.content)
        setSelectGrade(grade.data.content)
        setSelectLevel(level.data.content)
      } catch {
        onError('Error al cargar los datos')
        onClose()
      }
      setLoading(false)
    }

    if (isNewForm) void getBookSelects()
  }, [isNewForm])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Agregar nuevo libro' : 'Editar libro',
    finishButtonText: isNewForm ? 'Agregar libro' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditEditorialBook
        selectArea={selectArea}
        selectGrade={selectGrade}
        selectLevel={selectLevel}
        dataBook={dataBook}
        formLoadProps={formLoadProps}
      />
    </FormProvider>
  )
}

export default FormNewEditEditorialBookContainer
