import { UseFormRegister, FieldErrors } from 'react-hook-form'

import { RFormFieldsTabs } from 'utils/models/reactFormFieldsTabs'

export type FormNewEditAreaProps = {
  dataTabs: Content[]
  serviceAreas: Content
  onSubmit?: () => Promise<void>
  isNewForm?: boolean
  register: UseFormRegister<RFormFieldsTabs>
  errors: FieldErrors<RFormFieldsTabs>
}
export type Content = {
  id: number
  name: string
  productUnitId?: number
  price?: number
  type: string
  description?: string
  pictureUrl?: string
  visible: boolean
  defaultPackage: boolean
  media?: Media[]
  productUnit: ProductUnit
}
type Media = {
  id: number
  content: {
    id: number
    url: string
    name: string
    kind: string
  }
}
type ProductUnit = {
  id: number
  name: string
  productUnitId: number
  iconUrl: string
  color?: string
  description: string
  keywords?: Keyword[]
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
