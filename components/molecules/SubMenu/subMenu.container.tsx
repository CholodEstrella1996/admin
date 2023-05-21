import { mock } from './mocks'
import { SubMenuComponent } from './subMenu.component'

export const SubMenuContainer = () =>
  mock ? <SubMenuComponent nodes={mock.content} label="Sistemas Operativos" /> : null
