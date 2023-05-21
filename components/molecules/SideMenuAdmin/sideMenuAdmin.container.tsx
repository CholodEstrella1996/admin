/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { SideMenuAdminComponent } from './sideMenuAdmin.component'
import { Section } from './sideMenuAdmin.model'

export type SideMenuAdminContainerProps = {
  sections: Section[]
  onLoad: () => unknown
  onChangeSection: () => unknown
}

export const SideMenuAdminContainer = ({
  sections,
  onLoad,
  onChangeSection,
}: SideMenuAdminContainerProps) => {
  useEffect(() => {
    onLoad()
  }, [])

  return <SideMenuAdminComponent sections={sections} onChangeSection={onChangeSection} />
}
