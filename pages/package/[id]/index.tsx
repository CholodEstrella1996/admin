import { NextPage } from 'next'
import { useRouter } from 'next/router'

import DetailsPackage from 'components/modules/FormDetailsPackage'

const PackageDetailsPage: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  if (typeof id !== 'string') return null

  return <DetailsPackage idPackage={Number(id)} />
}

export default PackageDetailsPage
