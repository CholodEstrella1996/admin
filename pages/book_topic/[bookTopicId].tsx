import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailsEditorialTopicContainer from 'components/modules/FormDetailsEditorialTopic'
import { BookTopicIdProvider } from 'utils/contexts/bookTopicId.context'

const DetailBookTopicPage: NextPage = () => {
  const router = useRouter()

  const { bookTopicId } = router.query
  if (typeof bookTopicId !== 'string') return null

  return (
    <BookTopicIdProvider value={bookTopicId}>
      <FormDetailsEditorialTopicContainer idBookTopic={bookTopicId} />
    </BookTopicIdProvider>
  )
}

export default DetailBookTopicPage
