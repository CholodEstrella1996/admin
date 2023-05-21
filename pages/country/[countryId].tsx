import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailsCountryContainer from 'components/modules/FormDetailsCountry'

const DetailBookPage: NextPage = () => {
  const router = useRouter()
  const { countryId } = router.query
  if (typeof countryId !== 'string') return null
  return <FormDetailsCountryContainer countryId={Number(countryId)} />
}

export default DetailBookPage
