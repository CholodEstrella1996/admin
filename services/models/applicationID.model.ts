import { Downloadables } from './applicationTechnical.model'

export type ApplicationLearning = {
  id: number
  name: string
  productUnitId: number
  classroomCode: string
  iconUrl: string
  keywords: string[]
  applicationType: {
    id: number
    name: string
  }
  description?: string
  applications?: Application[]
  lastVersion?: LastVersion
  defaultPackageId: number
}

type Application = {
  classroomCode: string
  description: string
  iconUrl: string
  id: number
  name: string
  productUnitId: number
  type: {
    id: number
    name: string
  }
}

type LastVersion = {
  applicationId: number
  description: string
  downloadables: Downloadables[]
  id: number
  securityVersionNumber: number
  versionNumber: number
}
