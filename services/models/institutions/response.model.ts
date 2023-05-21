import { Pagination } from 'utils/models/modelsBase'

export type InstitutionResponse = {
  getInstitutionTree: GetInstitutionTree
}
// General
type ContentNode = {
  id: number
  kind: string
  name: string
  marked?: boolean
  content?: ContentNode[]
}

// Endpoints
type GetInstitutionTree = Pagination & {
  content: {
    id: number
    kind: string
    name: string
    marked?: boolean
    content?: ContentNode[]
  }[]
}
