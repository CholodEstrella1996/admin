import { MouseEvent, useState } from 'react'

import { MoreVertical } from '@easy-eva-icons/react'
import theme from '@folcode/clabs.others.theme-provider'
import { IconButton, Menu } from '@mui/material'

import { MoreMenuProps } from './moreMenu.model'
import { MoreMenuGlobalStyles } from './moreMenu.styles'

const MoreMenuComponent = ({ children }: MoreMenuProps) => {
  const { colors } = theme
  const [anchorElement, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertical color={colors.primary[500]} />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        open={!!anchorElement}
        onClose={handleClose}
        elevation={0}
        className="menu__buttons">
        {children}
      </Menu>
      <style jsx global>
        {MoreMenuGlobalStyles}
      </style>
    </>
  )
}

export default MoreMenuComponent
