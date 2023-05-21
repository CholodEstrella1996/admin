import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { RFile } from 'utils/models/reactFormFieldsTabs'

export type LanguageTypes = 'EN' | 'ES' | 'PT' | 'TR'

export type ApplicationFormModel = {
  step1: {
    applicationType: InputSelectOption
    classroomCode: string
    tabs: {
      [key in LanguageTypes]: {
        name: string
        description: string
        keywords: string[]
      }
    }
    storeAdministration: {
      disponibility: boolean
      icon: RFile[]
      price: string
      associatedMedia: RFile[]
    }
  }
}
export type ExecutablesModel = {
  'launcher-windows': RFile[]
  'launcher-mac': RFile[]
  'launcher-android': RFile[]
  web: RFile[]
  'lti-web': RFile[]
}
