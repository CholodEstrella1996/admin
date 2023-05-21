import { ApiResponseTopicLabs } from 'services/models/book.model'
import { ApiResponseAssignature } from 'services/models/curriculums'

export type FormDetailsGradeTopicProps = {
  idAssignature: number
  dataAssignature: ApiResponseAssignature
  dataLabsTopic?: ApiResponseTopicLabs
}
