import { Items } from './components/items.component'
import { Title } from './components/title.component'
import { TreeMenuNode } from './subMenu.model'
import { SubMenuLocalStyles } from './subMenu.styles'

// Types
export type TreeMenuComponentProps = {
  nodes: TreeMenuNode[]
  label: string
}

export const SubMenuComponent = ({ nodes, label }: TreeMenuComponentProps) => (
  <div className="container">
    <Title label={label} link="/menu" />

    {!!nodes && <Items nodes={nodes} />}

    <style jsx>{SubMenuLocalStyles}</style>
  </div>
)
