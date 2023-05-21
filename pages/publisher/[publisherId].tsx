import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailsEditorialContainer from 'components/modules/FormDetailsEditorial'

const DetailEditorialPage: NextPage = () => {
  const router = useRouter()
  const { publisherId } = router.query

  return publisherId !== undefined ? (
    <FormDetailsEditorialContainer idEditorial={Number(publisherId)} />
  ) : null
}

export default DetailEditorialPage
