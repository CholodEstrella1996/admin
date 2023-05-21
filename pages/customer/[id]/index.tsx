import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { CustomerIdProvider } from 'utils/contexts/customerId.context'

import { FormDetailsCustomers } from '../../../components/modules/FormDetailsCustomers/formDetailsCustomers.container'

const CustomerDetailsPage: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  return (
    <CustomerIdProvider value={Number(id)}>
      <FormDetailsCustomers idCustomer={Number(id)} />
    </CustomerIdProvider>
  )
}

export default CustomerDetailsPage
