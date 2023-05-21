import { Checkbox } from 'components/atoms/inputs/InputCheckbox/components/checkbox.component'

import type { TreeSelectorNode } from '../../treeSelector.models'
import { ExpandableIcon } from '../expandableIcon.component'
import { NodeLocalStyles } from './node.styles'

export type NodeProps = {
  node: TreeSelectorNode

  expanded: boolean
  status: TreeSelectorNode['status']

  withIcon?: boolean

  onClick?: () => unknown
  onExpand?: () => unknown
}

export const Node = (props: NodeProps) => {
  const { node, expanded, status, withIcon, onClick, onExpand = () => {} } = props

  return (
    <button className="node" onClick={onClick} type="button">
      <Checkbox
        checked={status === 'checked'}
        indeterminate={status === 'indeterminate'}
        onChange={() => {}}
      />

      <p className="label">{node.displayName ?? node.name}</p>

      <div className="icon-container">
        {withIcon && <ExpandableIcon expanded={expanded} onClick={onExpand} />}
      </div>

      <style jsx>{NodeLocalStyles}</style>
    </button>
  )
}
