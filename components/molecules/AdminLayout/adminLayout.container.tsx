import React from 'react'

import { TreeMenuProvider } from 'utils/contexts/treeMenu.context'
import useAuth from 'utils/hooks/useAuth'

import { AdminLayoutComponent } from './adminLayout.component'

export type AdminLayoutContainerProps = {
  children: React.ReactNode
}

export const AdminLayoutContainer = ({ children }: AdminLayoutContainerProps) => {
  useAuth()

  return (
    <TreeMenuProvider initialValue={{ selectedNode: null, treeMenuData: null }}>
      <AdminLayoutComponent>{children}</AdminLayoutComponent>
    </TreeMenuProvider>
  )
}
