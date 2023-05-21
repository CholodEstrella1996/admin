export type ApiContent = {
  content: Content[]
}
export type Content = {
  id: number
  name: string
  productUnitId?: number
  iconUrl?: string
  color?: string
  description?: string
  price?: number
  keywords?: Keyword[]
  pictureUrl?: string
  visible?: boolean
  defaultPackage?: boolean
  media?: Media[]
  productUnit?: ProductUnit
  language?: Language
  type?: string | Type
}

type Type = {
  id: number
  name: string
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

export type Media = {
  id: number
  content: {
    format?: {
      extension: string
      contentType: string
    }
    id: number
    url: string
    name: string
    kind: string
  }
}

export type ProductUnit = {
  id?: number
  name?: string
  productUnitId?: number
  iconUrl: string
  color?: string
  description?: string
  keywords?: Keyword[]
}
