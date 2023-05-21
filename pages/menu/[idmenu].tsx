import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { ShowListSystem } from 'components/modules/ShowLists/System'

const MenuCloudlabsPage: NextPage = () => {
  const router = useRouter()
  const { idmenu } = router.query

  return idmenu !== undefined ? <ShowListSystem idMenu={Number(idmenu)} /> : null
}

export default MenuCloudlabsPage
