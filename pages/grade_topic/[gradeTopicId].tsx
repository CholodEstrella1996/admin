import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailsGradeTopicComponent from 'components/modules/FormDetailsGradeTopic'
import { GradeTopicIdProvider } from 'utils/contexts/gradeTopicId.context'

const DetailBookTopicPage: NextPage = () => {
  const router = useRouter()
  const { gradeTopicId } = router.query
  if (typeof gradeTopicId !== 'string') return null
  return (
    <GradeTopicIdProvider value={gradeTopicId}>
      <FormDetailsGradeTopicComponent gradeTopicId={gradeTopicId} />
    </GradeTopicIdProvider>
  )
}

export default DetailBookTopicPage
