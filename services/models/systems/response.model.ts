import { Pagination } from 'utils/models/modelsBase'

export type SystemResponse = {
  getSystem: GetSystem
}

type GetSystem = Pagination & {
  content: {
    id: number
    title: string
    description: string
    active: boolean
    version: string
  }[]
}
