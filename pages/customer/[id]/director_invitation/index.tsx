import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Invites from 'components/modules/Invites'

const InvitationPage: NextPage = () => {
  const router = useRouter()
  const customerId = router.asPath.split('/', 3)[2].split('-', 1).toString()

  if (!customerId) return null

  return <Invites customerId={Number(customerId)} />
}

export default InvitationPage
