import { useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { routesWithTreeMenu } from 'constants/router.constants'
import { treeMenuService } from 'services/modules/treeMenu.module'
import { useTreeMenuContext } from 'utils/contexts/treeMenu.context'
import { waitFor } from 'utils/helpers/waitFor'

// Constants
const sectionMethods: { [key: string]: keyof typeof treeMenuService } = {
  area: 'getAreas',
  publisher: 'getPublishers',
  country: 'getCountries',
}

// Methods
export const getSectionByRoute = (selectedSection: string): string | null => {
  const sections = Object.entries(routesWithTreeMenu).flatMap(([section, subSections]) => {
    const isSection = section === selectedSection
    const isSubsection = subSections.includes(selectedSection)

    return isSection || isSubsection ? section : []
  })

  return sections[0] ?? null
}

const useTreeMenu = () => {
  // Hooks
  const router = useRouter()
  const { setTreeMenuData } = useTreeMenuContext()

  // Refs
  const refreshDataRef = useRef({ count: 0, currentData: '' })

  // States
  const [currentSection, setCurrentSection] = useState<string>()
  const [loading, setLoading] = useState(true)

  // Methods
  const getSectionFromRoute = () => {
    const routeFragment = router.pathname.split('/')[1]
    const section = getSectionByRoute(routeFragment)
    return section
  }

  const getDataBySection = async (section: string) => {
    try {
      setLoading(true)
      setCurrentSection(section)

      const { data } = await treeMenuService[sectionMethods[section]]()

      setTreeMenuData(data)
      refreshDataRef.current = { ...refreshDataRef.current, currentData: JSON.stringify(data) }
    } catch {
      setTreeMenuData(null)
      void router.push('_error')
    }
    setLoading(false)
  }

  const refreshTreeData = async (prevData: string): Promise<void> => {
    // Get data from server
    const section = getSectionFromRoute()
    if (!section) return

    await getDataBySection(section)

    // Check if data has changed or refresh count is greater than 3
    const { count, currentData } = refreshDataRef.current
    if (currentData !== prevData || count > 3) {
      refreshDataRef.current = { count: 0, currentData: '' }
      return
    }

    // Wait for 1 second and refresh data again
    await waitFor(3000)
    refreshDataRef.current = { ...refreshDataRef.current, count: count + 1 }
    await refreshTreeData(prevData)
  }

  const getTreeData = () => {
    const section = getSectionFromRoute()
    if (!section) {
      setLoading(false)
      setCurrentSection('')
      setTreeMenuData(null)
      return
    }

    if (currentSection && section === currentSection) return
    void getDataBySection(section)
  }

  return { loading, getTreeData, refreshTreeData }
}

export default useTreeMenu
