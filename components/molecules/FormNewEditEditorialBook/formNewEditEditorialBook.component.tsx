import theme from '@folcode/clabs.others.theme-provider'

import { ApiResponseBook } from 'services/models/book.model'
import { Options } from 'utils/models/reactFormFieldsTabs'

import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import FormEditorialBook from './components/formEditorialBook.component'
import {
  FormNewEditEditorialBookGlobalStyles,
  FormNewEditEditorialBookLocalStyles,
} from './formNewEditEditorialBook.styles'

type Props = {
  selectArea?: Options[]
  selectGrade?: Options[]
  selectLevel?: Options[]
  dataBook?: ApiResponseBook

  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewEditEditorialBook = (props: Props) => {
  const {
    selectArea,
    selectGrade,
    selectLevel,
    dataBook,

    formLoadProps,
  } = props
  const { colors } = theme

  const formEditorialBook = (
    <FormEditorialBook
      selectArea={selectArea}
      selectLevel={selectLevel}
      selectGrade={selectGrade}
      dataBook={dataBook}
    />
  )

  const steps = [{ id: 1, element: formEditorialBook }]

  return (
    <>
      <div className={colors.engineering[100]} />

      <FormLoad steps={steps} {...formLoadProps} />

      <style jsx>{FormNewEditEditorialBookLocalStyles}</style>
      <style jsx global>
        {FormNewEditEditorialBookGlobalStyles}
      </style>
    </>
  )
}

export default FormNewEditEditorialBook
