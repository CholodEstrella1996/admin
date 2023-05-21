export type TechnicalDetail = {
  id: number
  description: string
  versionNumber: number
  securityVersionNumber: number
  applicationId: number
  downloadables: Downloadables[]
  classroomCode: string
  appleUrl: string
  androidPackageName: string
}

export type TextContent = {
  name: string
  buttonText: string
  learningSubtitle: string
  learningAdd: string
}

export type TechnicalDetailTitles = {
  executable: string
  codeRoom: string
  appStore: string
  version: string
  securityVersion: string
  packageName: string
}

export type LearningUnits = {
  id: number
  name: string
  description: string
  productUnitId: number
  classroomCode: string
  keywords: Keyword[]
  type: Type
  lastVersion: LastVersion
  pedagogicalMaterials: PedagogicalMaterial[]
  applications: Application[]
}

type Downloadables = {
  id: number
  downloadable: Downloadable
  packageName: string
  url: string
  platform: Platform
}

type Downloadable = {
  id: number
  url: string
  name: string
  kind: string
  format: Format
}

type Format = {
  extension: string
  contentType: string
}

type Platform = {
  id: number
  name: string
  iconUrl: string
  contentKind: string
}

type Keyword = {
  id: number
  name: string
  language: Language
}

type Language = {
  id: number
  name: string
  languageCode: string
  defaultLanguage: boolean
}

type Type = {
  id: number
  name: string
}

type LastVersion = {
  id: number
  description: string
  versionNumber: number
  securityVersionNumber: number
}

type PedagogicalMaterial = {
  id: number
  name: string
  description: string
  content: Content
  type: Type
  authorities: Authority[]
}

type Content = {
  id: number
  url: string
  name: string
  kind: string
  format: Format
}

type Authority = {
  id: number
  name: string
}

type Application = {
  id: number
  name: string
  description: string
  productUnitId: number
  classroomCode: string
  iconUrl: string
  type: Type
}
