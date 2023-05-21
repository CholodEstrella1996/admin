export type ApplicationResponse = {
  content: Content[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type ApplicationCreateResponse = {
  classroomCode: string
  defaultPackageId: number
  description: string
  id: number
  keywords: [] | null
  links: string[]
  name: string
  productUnitId: number
  type: { id: number; name: string }
}

export type ApplicationTypeResponse = {
  content: { id: number; name: string }[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type ApplicationRequest = {
  classroomCode: string
  defaultPackagePrice: number
  description: string
  keywords: string[]
  name: string
  parentApplicationId?: number
  topicId?: number
  type: string
  visible: boolean
}

export type ApplicationRequestIcon = {
  accessControlRule: string
  file: string
  fileFormat: {
    contentType: string
    extension: string
  }
  id: number
  kind: string
  name: string
  packageName: string
  platform: string
  url: string
}

export type ApplicationRequestTranslation = {
  description: string
  keywords: string[]
  languageCode: string
  name: string
}

export type ApplicationRequestVersion = {
  applicationId: number
  description: string
  securityVersionNumber: number
  versionNumber: number
  links?: {
    href: string
    rel: string
    type: string
  }[]
}

export type Application = {
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
    applicationId: number | null
    downloadables: string[]
  }
  applications: string[]
}

type Content = {
  id: number
  name: string
  description: string
  productUnitId: number
  classroomCode: string
  type: Type
  iconUrl: string
  color: string
}

type Pageable = {
  sort: Sort
  offset: number
  pageNumber: number
  unpaged: boolean
  paged: boolean
}

type Sort = {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

type Type = {
  id: number
  name: string
}

export type ApplicationParams = {
  topicId?: number
  pageNumber?: number
  pageSize?: number
}
