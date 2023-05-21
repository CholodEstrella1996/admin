/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Spinner from 'components/atoms/Spinner'
import { sections } from 'constants/router.constants'
import { useTreeMenuContext } from 'utils/contexts/treeMenu.context'
import useTreeMenu from 'utils/hooks/useTreeMenu'

import { HeaderAdmin } from '../HeaderAdmin'
import { SideMenuAdmin } from '../SideMenuAdmin'
import { SubMenu } from '../SubMenu'
import { TreeMenu } from '../trees/TreeMenu'
import { AdminLayoutGlobalStyles, AdminLayoutLocalStyles } from './adminLayout.styles'

export type AdminLayoutComponentProps = {
  children: React.ReactNode
}

export const AdminLayoutComponent = ({ children }: AdminLayoutComponentProps) => {
  // Hooks
  const { loading, getTreeData } = useTreeMenu()
  const { treeMenuData } = useTreeMenuContext()
  const { status } = useSession()
  const router = useRouter()

  // Effects
  useEffect(() => {
    getTreeData()
  }, [router.pathname])

  // Render
  return (
    <>
      <div className="container">
        <header className="header">
          <HeaderAdmin />
        </header>

        {status === 'authenticated' ? (
          <>
            {router.asPath.includes('menu') ? (
              <aside className="sidebar">
                <SideMenuAdmin sections={sections} onLoad={() => {}} onChangeSection={() => {}} />
                <SubMenu />
              </aside>
            ) : (
              <aside className="sidebar">
                <SideMenuAdmin sections={sections} onLoad={() => {}} onChangeSection={() => {}} />
                {!loading && treeMenuData !== null && <TreeMenu />}
              </aside>
            )}

            <main className="content">{!loading ? children : <Spinner />}</main>
          </>
        ) : (
          <main className="content">{children}</main>
        )}
      </div>

      <style jsx>{AdminLayoutLocalStyles}</style>
      <style jsx global>
        {AdminLayoutGlobalStyles}
      </style>
    </>
  )
}
