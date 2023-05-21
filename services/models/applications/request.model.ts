import { RFile } from 'utils/models/reactFormFieldsTabs'

export type ApplicationRequest = {
  createApplication: CreateApplication
  updateApplication: UpdateApplication

  addTranslation: AddTranslation

  uploadIcon: UploadIcon

  createVersion: CreateVersion
  uploadVersionDownloadable: UploadVersionDownloadable
}

// General
type CreateApplication = {
  name: string
  description: string
  classroomCode: string
  keywords: string[]
  type: string
  parentApplicationId?: number
  topicId: number
  defaultPackagePrice: number
  visible: boolean
}
type UpdateApplication = Omit<CreateApplication, 'topicId'>

// Translations
type AddTranslation = {
  name: string
  description: string
  keywords: string[]
  languageCode: string
}

// Files
type UploadIcon = {
  file: RFile[]
}

// Versions
type CreateVersion = {
  description: string
  versionNumber: number
  securityVersionNumber: number
}

type UploadVersionDownloadable = {
  data:
    | { platform: 'launcher-mac'; url: string }
    | { platform: 'launcher-android'; packageName: string }
    | { platform: 'launcher-windows' }
    | { platform: 'web' }
    | { platform: 'lti-web' }
  file: RFile[]
}
