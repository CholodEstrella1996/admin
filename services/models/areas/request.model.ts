export type AreaRequest = {
  postAreaEnglishService: PostAreaEnglishService
  putAreaTranslationsService: PutAreaTranslationsService
  putAreaEnglishService: PutAreaEnglishService
}

// General
type GeneralPutResponse = {
  description: string
  keywords: string[] | null
  languageCode?: string
  name: string
  color?: string
  colorDark?: string
  colorLight?: string
  visible?: boolean
  defaultPackagePrice?: number
}

// Endpoints
type PostAreaEnglishService = {
  color: string
  colorDark: string
  colorLight: string
  defaultPackagePrice: number
  description: string
  keywords: string[] | null
  name: string
  visible: boolean
}

type PutAreaTranslationsService = GeneralPutResponse
type PutAreaEnglishService = GeneralPutResponse
