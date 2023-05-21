import { ApiResponseBookTopic, ApiResponseTopicLabs } from 'services/models/book.model'

export type FormDetailEditorialTopicProps = {
  idBookTopic: number
  idBook?: number
  dataBookTopic: ApiResponseBookTopic
  dataLabsTopic: ApiResponseTopicLabs
}
