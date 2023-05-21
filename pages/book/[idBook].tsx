import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailEditorialBookContainer from 'components/modules/FormDetailsEditorialBook'

const DetailBookPage: NextPage = () => {
  const router = useRouter()
  const { idBook } = router.query
  if (typeof idBook !== 'string') return null
  return <FormDetailEditorialBookContainer idBook={Number(idBook)} />
}

export default DetailBookPage
