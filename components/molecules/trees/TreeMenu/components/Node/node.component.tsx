import { Avatar } from '@folcode/clabs.atoms.avatar'
import theme from '@folcode/clabs.others.theme-provider'

import { TreeMenuNode } from '../../treeMenu.model'
import { ExpandableIcon } from '../expandableIcon.component'
import { NodeLocalStyles } from './node.styles'

// Constants
const { colors } = theme

export type NodeProps = {
  node: TreeMenuNode
  expanded: boolean
  selected: boolean

  withIcon?: boolean
  withAvatar?: boolean

  onClick?: () => unknown

  onExpand?: () => unknown
}

export const Node = (props: NodeProps) => {
  const { node, expanded, selected, withIcon, withAvatar, onClick, onExpand = () => {} } = props

  const selectedStyle = selected ? 'node--selected' : ''

  const applicationType = node.type?.name === 'Laboratory' ? 'Laboratorio' : 'Unidad de Aprendizaje'

  return (
    <button className={`node ${selectedStyle}`} onClick={onClick} type="button">
      {withAvatar ? (
        <Avatar name={applicationType} size="small" color={colors.neutrals[200]} />
      ) : (
        <div className="icon-container">
          {withIcon && <ExpandableIcon expanded={expanded} onClick={onExpand} />}
        </div>
      )}

      <p className="label">{node.name}</p>

      <style jsx>{NodeLocalStyles}</style>
    </button>
  )
}
