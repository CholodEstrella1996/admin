import { Items } from './components/items.component'
import { Title } from './components/title.component'
import { TreeMenuNode } from './treeMenu.model'
import { TreeMenuLocalStyles } from './treeMenu.styles'

// Types
export type TreeMenuComponentProps = {
  nodes: TreeMenuNode[]
  label: string
}

export const TreeMenuComponent = ({ nodes, label }: TreeMenuComponentProps) => (
  <div className="container">
    <Title label={label} link={`/${nodes[0]?.kind ?? ''}`} />

    {!!nodes && <Items nodes={nodes} />}

    <style jsx>{TreeMenuLocalStyles}</style>
  </div>
)
