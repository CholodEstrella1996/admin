import { useTreeMenuContext } from 'utils/contexts/treeMenu.context'

import { TreeMenuComponent } from './treeMenu.component'

export const TreeMenuContainer = () => {
  const { treeMenuData } = useTreeMenuContext()

  return treeMenuData ? (
    <TreeMenuComponent nodes={treeMenuData.content} label={treeMenuData.label} />
  ) : null
}
