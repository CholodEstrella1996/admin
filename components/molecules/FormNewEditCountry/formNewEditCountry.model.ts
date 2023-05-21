import { Content } from 'utils/models/modelsBase'
import { RFile } from 'utils/models/reactFormFieldsTabs'

export type FormNewEditCountryModel = {
  countryNameEN: string
  countryNameES: string
  countryNamePT: string
  countryNameTR: string
  countryIcon: RFile[]
  countryDisponibility: boolean
}

export type Languages = {
  content: Content
  validationFields: {
    name: string
  }
}

export type ApiResponseCountry = {
  id: number
  name: string
  description: string
  visible: boolean
  iconUrl: string
}

export type PostCountryModel = {
  data: { name: string; visible: boolean; kind: string; parentId: 1 }
  icon: RFile[]
}
