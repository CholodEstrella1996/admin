import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'

export type FormNewEditEditorialBookModel = {
  bookTitle: string
  bookArea: InputSelectOption
  bookGrade: InputSelectOption
  bookLevel: InputSelectOption
  bookYearPublication: number
  bookEdition: string
  bookDisponibility: boolean
}
