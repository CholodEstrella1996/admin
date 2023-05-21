import { NextPage } from 'next'
import { useRouter } from 'next/router'

import DetailEditUserContainer from 'components/modules/DetailEditUser'
import { SubscriptionIdProvider } from 'utils/contexts/subscriptionId.context'

const DetailUserPage: NextPage = () => {
  const router = useRouter()
  const { id, memberID } = router.query

  return (
    <SubscriptionIdProvider value={Number(id)}>
      <DetailEditUserContainer memberId={Number(memberID)} />
    </SubscriptionIdProvider>
  )
}

export default DetailUserPage
