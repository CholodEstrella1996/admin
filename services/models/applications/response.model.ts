import { Pagination } from 'utils/models/modelsBase'

export type ApplicationResponse = {
  getApplications: GetApplications
  getApplication: GetApplication

  createApplication: CreateApplication
  updateApplication: UpdateApplication
  deleteApplication: DeleteApplication

  getTypes: GetTypes

  addTranslation: AddTranslation
  getTranslations: GetTranslations

  uploadIcon: UploadIcon

  createVersion: CreateVersion
  getVersion: GetVersion
  uploadVersionDownloadable: UploadVersionDownloadable
}

// General
type GetApplications = Pagination & {
  content: {
    id: number
    name: string
    description: string
    productUnitId: string
    classroomCode: string
    iconUrl: string

    type: {
      id: number
      name: string
    }
  }[]
}
type GetApplication = {
  id: number
  name: string
  description: string
  productUnitId: number
  classroomCode: string
  iconUrl: string
  keywords: string[]
  applicationType: {
    id: number
    name: string
  }
  lastVersion: {
    id: number
    description: string
    versionNumber: number
    securityVersionNumber: number

    // TODO: Revisar esto, ya que en el Swagger no existen los siguientes campos:
    applicationId: null
    downloadables: unknown[]
  }
  applications: {
    id: number
    name: string
    description: string
    productUnitId: number
    classroomCode: string
    iconUrl: string
    type: {
      id: number
      name: string
    }
  }[]
  // TODO: Revisar esto, ya que en la respuesta real no existen los siguientes campos:
  pedagogicalMaterials?: unknown[]
}

type CreateApplication = {
  id: number
  name: string
  description: string
  productUnitId: number
  classroomCode: string
  defaultPackageId: number
  keywords: string[]
  type: {
    id: number
    name: string
  }
  links: {
    rel: string
    href: string
    type: string
  }[]
}
type UpdateApplication = never
type DeleteApplication = {
  id: number
  name: string
  description: string
  productUnitId: number
  classroomCode: string
  iconUrl: string | null
  keywords: string[]
  applicationType: {
    id: number
    name: string
  }
  lastVersion: {
    id: number
    description: string
    versionNumber: number
    securityVersionNumber: number

    // TODO: Revisar esto, ya que en el Swagger no existen los siguientes campos:
    applicationId: null
    downloadables: unknown[]
  } | null
  applications:
    | {
        id: number
        name: string
        description: string
        productUnitId: number
        classroomCode: string
        iconUrl: string
        type: {
          id: number
          name: string
        }
      }[]

  // TODO: Revisar esto, ya que en la respuesta real no existen los siguientes campos:
  pedagogicalMaterials?: unknown[]
}

// Types
type GetTypes = Pagination & {
  content: {
    id: number
    name: string
  }[]
}

// Translations
type AddTranslation = {
  id: number
  name: string
  description: string
  productUnitId: number
  keywords: string[]
  type: {
    id: number
    name: string
  }
  language: {
    id: number
    name: string
    languageCode: string
    defaultLanguage: boolean
  }
  classroomCode: string
}

type GetTranslations = Pagination & {
  content: AddTranslation[]
}

// Files
type UploadIcon = never

// Versions
type CreateVersion = {
  id: number
  description: string
  versionNumber: number
  securityVersionNumber: number
  applicationId: number
  links: {
    rel: string
    href: string
    type: string
  }[]
}
type GetVersion = Omit<CreateVersion, 'links'> & {
  androidPackageName: string
  appleUrl: string
  applicationId: number
  classroomCode: string | number
  description: string
  id: number
  securityVersionNumber: number
  versionNumber: number
  downloadables: {
    id: number
    packageName: string | null
    url: string | null
    platform: {
      id: number
      name: string
      iconContentId: number
    }
    downloadable: {
      id: number
      name: string
      url: string
      kind: string
      format: {
        extension: string
        contentType: string
      }
    }
  }[]
}

type UploadVersionDownloadable = {
  id: number
  downloadable: {
    id: number
    name: string
    url: string
    kind: string
    format?: {
      extension: string
      contentType: string
    }
  }
  packageName: string
  url: string
  platform: {
    id: number
    name: string
    iconContentId: number
  }
}
