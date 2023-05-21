import React from 'react'

import MoreMenuComponent from './moreMenu.component'
import { MoreMenuProps } from './moreMenu.model'

const MoreMenuContainer = ({ children }: MoreMenuProps) => (
  <MoreMenuComponent>{children}</MoreMenuComponent>
)

export default MoreMenuContainer
