export type Sector = {
  id: string
  name: string
  displayName: string
}

export type EducationKind = {
  id: string
  name: string
  displayName: string
}

export type Language = {
  id: number
  name: string
  languageCode: string
  defaultLanguage: boolean
}

export type Group = {
  id: number
  name: string
  description?: string
}
