import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'

export type FormNewAnnouncementModel = {
  bookTitle: string
  bookArea: InputSelectOption
  bookGrade: InputSelectOption
  bookLevel: InputSelectOption
  bookYearPublication: number
  bookEdition: string
  bookDisponibility: boolean
}
