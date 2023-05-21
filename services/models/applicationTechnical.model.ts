export type ApplicationTechnical = {
  androidPackageName: string
  appleUrl: string
  lastVersionId: number
  classroomCode: string
  description: string
  downloadables: Downloadables[]
  id: number
  securityVersionNumber: number
  versionNumber: number
}
export type Downloadables = {
  downloadable: Downloadable
  id: number
  packageName: string
  url: string
  platform: Platform
}

type Downloadable = {
  id: number
  name: string
  url: string
  kind: string
  format: Format
}

type Format = {
  contentType: string
  extension: string
}

type Platform = {
  iconContentId: number
  id: number
  name: string
}
