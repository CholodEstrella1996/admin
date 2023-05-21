import { TreeSelectorNode } from 'components/molecules/trees/TreeSelector/treeSelector.models'
import { RFile } from 'utils/models/reactFormFieldsTabs'

import { LanguageTypes } from '../Application/application.models'

export type PackageFormModel = {
  step1: {
    search: string
    applications: Omit<TreeSelectorNode, 'children'>[]
  }
  step2: {
    tabs: {
      [key in LanguageTypes]: {
        name: string
        description: string
        keywords: string[]
      }
    }
    storePackage: {
      disponibility: boolean
      icon: RFile[]
      associatedMedia: RFile[]
    }
  }
  step3: {
    price: number
  }
}
export type Medias = {
  id: number
  content: {
    id: number
    name: string
    url: string
    kind: string
    format: { extension: string; contentType: string }
  }
}
