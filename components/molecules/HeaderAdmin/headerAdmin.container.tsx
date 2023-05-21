import Image from 'next/image'

import { HeaderAdminComponent } from './headerAdmin.component'

export const HeaderAdminContainer = () => (
  <HeaderAdminComponent
    logoIcon={<Image src="/logo.svg" alt="" width="80px" height="40px" />}
    title="Ingeniería"
  />
)
