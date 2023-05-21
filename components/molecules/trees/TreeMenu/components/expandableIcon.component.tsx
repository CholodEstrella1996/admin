import { MouseEvent } from 'react'

import theme from '@folcode/clabs.others.theme-provider'
import { KeyboardArrowDownOutlined, KeyboardArrowRight } from '@mui/icons-material'

// Constants
const { colors } = theme
const arrowColor = colors.primary[500]

export type ExpandableIconProps = {
  expanded: boolean
  color?: string
  onClick?: () => unknown
}

export const ExpandableIcon = (props: ExpandableIconProps) => {
  const { expanded, color = arrowColor, onClick: onClickProp = () => {} } = props

  const onClick = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    onClickProp()
  }

  return expanded ? (
    <KeyboardArrowDownOutlined onClick={onClick} fontSize="inherit" sx={{ color }} />
  ) : (
    <KeyboardArrowRight onClick={onClick} fontSize="inherit" sx={{ color }} />
  )
}
