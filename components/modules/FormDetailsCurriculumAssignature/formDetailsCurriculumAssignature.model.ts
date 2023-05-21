import { GroupsByIdResponse } from 'services/models/groups.model'
import { TopicListResponse } from 'services/models/topic.model'

export type FormDetailsCurriculumAssignatureProps = {
  idAssignature: number
  tableSubTitle?: string
  dataAssignature: GroupsByIdResponse
  dataTable?: TopicListResponse
  parentId: number
  onDeleteElement: (id: number) => void
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  onRowsPaginationChange?: (rowsPerPage: number) => void
}
