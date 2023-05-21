import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { ShowListDevice } from 'components/modules/ShowLists/Devices'
import { SubscriptionIdProvider } from 'utils/contexts/subscriptionId.context'

const DevicesDetailsPage: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  return (
    <SubscriptionIdProvider value={Number(id)}>
      <ShowListDevice idSubscription={Number(id)} />
    </SubscriptionIdProvider>
  )
}
export default DevicesDetailsPage
