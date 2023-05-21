import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Institutions from 'components/modules/Institution/'

const InstitutionCustomerPage: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  return <Institutions idCustomer={Number(id)} />
}

export default InstitutionCustomerPage
