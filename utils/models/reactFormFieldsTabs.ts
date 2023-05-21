import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { PackageResponse } from 'services/models/packages/response.model'

import { Content } from './modelsBase'

export type RFormFieldsTabs = {
  topicNameEN: string
  topicDescriptionEN: string
  topicKeywordEN: string[]
  topicNameES: string
  topicDescriptionES: string
  topicKeywordES: string[]
  topicNamePT: string
  topicDescriptionPT: string
  topicKeywordPT: string[]
  topicNameTR: string
  topicDescriptionTR: string
  topicKeywordTR: string[]
  topicDisponibility: boolean
  topicPrice: number

  materialNameEN: string
  materialDescriptionEN: string
  materialNameES: string
  materialDescriptionES: string
  materialNamePT: string
  materialDescriptionPT: string
  materialNameTR: string
  materialDescriptionTR: string
  materialType: InputSelectOption
  materialAuthorities: InputSelectOption

  applicationNameEN: string
  applicationDescriptionEN: string
  applicationKeywordsEN: string[]
  applicationNameES: string
  applicationDescriptionES: string
  applicationKeywordsES: string[]
  applicationNamePT: string
  applicationDescriptionPT: string
  applicationKeywordsPT: string[]
  applicationType: string
  applicationPrice: number
  applicationDisponibility: boolean
  applicationIcon: string
  applicationUrl: string
  applicationWindows: string
  applicationApple: string
  applicationAndroid: string
  applicationWeb: string
  applicationClassroomCode: string
  applicationAppStore: string
  applicationVersionNumber: number
  applicationSecurityVersion: number
  applicationAndroidPackageName: string

  areaNameEN: string
  areaDescriptionEN: string
  areaKeywordEN: string[]
  areaNameES: string
  areaDescriptionES: string
  areaKeywordES: string[]
  areaNamePT: string
  areaDescriptionPT: string
  areaKeywordPT: string[]
  areaDescriptionTR: string
  areaNameTR: string
  areaKeywordTR: string[]
  areaDisponibility: boolean
  areaIcon: string
  areaFile: string
  areaPrice: number
  areaColor: string
  areaColorDark: string
  areaColorLight: string

  inputFile: File
  file: RFile[]
  applicationIconFile: RFile[]
  applicationMediaFile: RFile[]
  applicationWindowsFile: RFile[]
  applicationAppleFile: RFile[]
  applicationAndroidFile: RFile[]
  applicationWebFile: RFile[]

  fileES: RFile[]
  fileEN: RFile[]
  filePT: RFile[]
  fileTR: RFile[]
}

export type RFile = {
  id: string
  name: string
  type?: string
  data?: File
  url?: string
  kind?: string
  format?: { extension: string; contentType: string }
  deleted?: boolean
}

export type Options = {
  id: number
  name: string
  disabled?: boolean
  selected?: boolean
}

export type SubTitlesTabPanel = {
  subTitle1?: string
  subTitle2?: string
  subTitle3?: string
  subTitle4?: string
  subTitle5?: string
  subTitle6?: string
}

export type Title = {
  information: string
  detail: string
}

export type Languages = {
  content: Content
  validationFields: {
    name: string
    description: string
    keywords?: string
  }
}

export type StoreData = PackageResponse['getStore']['content'][0]
