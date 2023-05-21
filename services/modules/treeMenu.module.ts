import { TreeMenuData as TreeMenuResponse } from 'components/molecules/trees/TreeMenu/treeMenu.model'
import { GATEWAY_PRODUCT_SERVICE, GATEWAY_GUIDE_SERVICE } from 'constants/api.constants'

import api from '../api.client'

export const treeMenuService = {
  getAreas: () => api.get<TreeMenuResponse>(`${GATEWAY_PRODUCT_SERVICE}/areas/tree`),
  getPublishers: () =>
    api.get<TreeMenuResponse>(`${GATEWAY_GUIDE_SERVICE}/groups/tree?kind=publisher`),
  getCountries: () =>
    api.get<TreeMenuResponse>(`${GATEWAY_GUIDE_SERVICE}/groups/tree?kind=country`),
}
