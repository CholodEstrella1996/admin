import { GroupsByIdResponse } from 'services/models/groups.model'
import { TopicListResponse } from 'services/models/topic.model'

export type FormDetailsCurriculumGradeProps = {
  idGrade: number
  dataGrade: GroupsByIdResponse
  dataTable: TopicListResponse
  tableSubTitle?: string
  onDeleteTopic: (id: number) => void
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  onRowsPaginationChange?: (rowsPerPage: number) => void
}
