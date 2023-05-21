import { Pagination } from 'utils/models/modelsBase'

export type AnnouncementResponse = {
  getAnnouncementDetali: GetAnnouncementDetali
}

type GetAnnouncementDetali = Pagination & {
  content: {
    id?: number
    announcement: string
    message: string
    startDate: string
    recipeint: string
  }[]
}
