// Main type
export type LearningUnitService = {
  getLearningUnitsRequest: GetLearningUnitsRequest
  getLearningUnitsResponse: GetLearningUnitsResponse

  searchLearningUnitsRequest: SearchLearningUnitsRequest
  searchLearningUnitsResponse: SearchLearningUnitsResponse

  saveLearningUnitsRequest: SaveLearningUnitsRequest
  saveLearningUnitsResponse: SaveLearningUnitsResponse
}

// getLearningUnits
type GetLearningUnitsRequest = never
type GetLearningUnitsResponse = {
  content: {
    id: number
    name: string
    kind: null
    contents: {
      id: number
      name: string
      kind: string
      contents: {
        id: number
        name: string
        iconUrl: string | null
        kind: string
        type: {
          id: number
          name: string
        }
        marked?: boolean
      }[]
    }[]
  }[]
  pageable: string
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  size: number
  number: number
  numberOfElements: number
  empty: boolean
}

// searchLearningUnits
type SearchLearningUnitsRequest = GetLearningUnitsRequest
type SearchLearningUnitsResponse = GetLearningUnitsResponse

// saveLearningUnits
type SaveLearningUnitsRequest = {
  productUnitIds: number[]
}
type SaveLearningUnitsResponse = {
  content: {
    id: number
    name: string
    description: string
    iconUrl: null | string
    productUnitId: number
    classroomCode: string
    type: {
      id: number
      name: string
    }
  }[]
  pageable: 'INSTANCE'
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  empty: boolean
}
