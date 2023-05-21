import { Pagination } from 'utils/models/modelsBase'

export type PackageResponse = {
  getStore: GetStore
  getLanguages: GetLanguanges
  getPackageTree: GetPackageTree
  getPackageTreeWithStatus: GetPackageTreeWithStatus
  getPackageDraft: GetPackageDraft
  getPackageStore: GetPackageStore
  postPackage: PostPackage
}

// Endpoints
type PostPackage = {
  id: number
  name: string
  description: string
  visible: true
  defaultPackage: false
  keywords: string[]
  iconId: number
}
type GetPackageStore = {
  id: number
  name: string
  description: string
  visible: boolean
  type: string
  price: number
  icon: {
    id: number
    name: string
    url: string
    kind: string
    format: { extension: string; contentType: string }
  }
  media: {
    id: number
    content: {
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
  translations: {
    id: number
    name: string
    description: string
    keywords?: string
    language: { id: number; name: string; languageCode: string; defaultLanguage: boolean }
  }[]
}
type GetPackageDraft = {
  name: string
  price: number
  packagesByKind: {
    key: string
    label: string
    contents: {
      id: number
      name: string
      type?: string
    }[]
  }[]
}

type GetLanguanges = Pagination & {
  content: {
    id: number
    name: string
    languageCode: string
    defaultLanguage: boolean
  }[]
}
type GetStore = Pagination & {
  content: {
    id: number
    name: string
    description: string
    visible: boolean
    productUnitId: number
    defaultPackage: boolean
    type: null
    price: number
    color: string | null
    colorDark: string | null
    colorLight: string | null
    icon: {
      id: number
      name: string
      url: string
      kind: string
      format: {
        extension: string
        contentType: string
      }
    }
    picture: null
    media:
      | null
      | {
          id: number
          content: {
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
  }[]
}

type GetPackageTree = {
  label: string
  content: {
    id: number
    name: string
    kind: string
    contents: {
      id: number
      name: string
      kind: string
      contents: {
        id: number
        name: string
        iconUrl: null | string
        kind: string
        type: {
          id: number
          name: string
        }
      }[]
    }[]
  }[]
}

type GetPackageTreeWithStatus = Pagination & {
  content: {
    id: number
    name: string
    contents?: {
      id: number
      name: string
      contents?: {
        id: number
        name: string
        iconUrl?: string
        type: {
          id: number
          name: string
        }
        marked: boolean
      }[]
      marked: boolean
    }[]
    marked: boolean
  }[]
}
