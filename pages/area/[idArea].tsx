import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Area from 'components/modules/Area'

const AreaPage: NextPage = () => {
  const router = useRouter()
  const { idArea } = router.query

  return idArea !== undefined ? <Area idArea={Number(idArea)} /> : null
}

export default AreaPage
