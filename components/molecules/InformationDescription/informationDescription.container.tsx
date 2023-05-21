import InformationDescriptionComponent from './informationDescription.component'
import { Content } from './informationDescription.model'

type Props = {
  content1?: Content[]
  content2?: Content[]
}

const InformationDescription = ({ content1, content2 }: Props) => (
  <InformationDescriptionComponent content1={content1} content2={content2} />
)

export default InformationDescription
