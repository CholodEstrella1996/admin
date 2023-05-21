import { OptionProps } from 'components/atoms/inputs/InputSelectMulti/select.models'
import { Language } from 'utils/models/classroom.models'

export type MessageProps = {
  languageCode: (languageCode: string) => void
  message?: string
  language: Language[]
}

export type FormInvites = {
  classroomIds: number[]
  emailList: string[]
  languageCode: OptionProps
  message?: string
  role?: string
}
