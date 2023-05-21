import { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailsSubscription from 'components/modules/FormDetailsSubscription'
import { SubscriptionIdProvider } from 'utils/contexts/subscriptionId.context'

const SubscriptionDetailsPage: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  return (
    <SubscriptionIdProvider value={Number(id)}>
      <FormDetailsSubscription idSubscription={Number(id)} />
    </SubscriptionIdProvider>
  )
}

export default SubscriptionDetailsPage
