import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { DetailApplication } from 'components/modules/DetailApplication'

const ApplicationPage: NextPage = () => {
  const router = useRouter()
  const { idApplication } = router.query

  return idApplication !== undefined ? <DetailApplication idApp={Number(idApplication)} /> : null
}

export default ApplicationPage
