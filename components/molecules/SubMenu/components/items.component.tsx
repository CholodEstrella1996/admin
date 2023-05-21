import { TreeMenuNode } from '../subMenu.model'
import { Item } from './item.component'

type ItemsProps = {
  nodes: TreeMenuNode[]
}

export const Items = ({ nodes }: ItemsProps) => (
  <ul className="items">
    {nodes.map((node) => (
      <Item key={node.id} node={node}>
        <Items nodes={node.contents ?? []} />
      </Item>
    ))}

    <style jsx>{`
      .items {
        all: unset;
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        padding-left: 1rem;
      }
    `}</style>
  </ul>
)
