import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { TopicIdProvider } from 'utils/contexts/topicId.context'

import DetailTopic from '../../components/modules/DetailsTopic'

const DetailTopicPage: NextPage = () => {
  const router = useRouter()

  const { topicId } = router.query
  if (typeof topicId !== 'string') return null

  return (
    <TopicIdProvider value={topicId}>
      <DetailTopic idTopic={Number(topicId)} />
    </TopicIdProvider>
  )
}

export default DetailTopicPage
