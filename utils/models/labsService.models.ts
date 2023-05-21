// Main type
export type LabsService = {
  getLabsRequest: GetLabsRequest
  getLabsResponse: GetLabsResponse

  searchLabsRequest: SearchLabsRequest
  searchLabsResponse: SearchLabsResponse

  saveLabsRequest: SaveLabsRequest
  saveLabsResponse: SaveLabsResponse
}

// getLabs
type GetLabsRequest = never
type GetLabsResponse = {
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

// searchLabs
type SearchLabsRequest = GetLabsRequest
type SearchLabsResponse = GetLabsResponse

// saveLabs
type SaveLabsRequest = {
  productUnitIds: number[]
}
type SaveLabsResponse = {
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
