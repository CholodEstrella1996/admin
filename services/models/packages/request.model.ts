export type PackageRequest = {
  getPackageDraft: GetPackageDraft
  postPackage: PostPackage
}
type GetPackageDraft = {
  name: string
  productUnitIds: number[]
}
type PostPackage = {
  name: string
  description: string
  visible: boolean
  defaultPackage: boolean
  type: string
  price: number
  keywords: string[]
  packageIds: number[]
  translations: Translation[]
  file: FormData
}

type Translation = {
  name: string
  description: string
  keywords: string[]
  languageCode: string
}
