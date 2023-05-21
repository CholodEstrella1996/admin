import { Box } from '@mui/material'

import { Content } from 'utils/models/modelsBase'

import Tabs from './Components/tabs.component'

type TabChangeProps = {
  children?: React.ReactNode
  index: number
  tabActualIndex: number
}

type TabPanelProps = {
  index: number
  tabIndex: number
  data: Content
  titles: { name: string; description?: string; attachChipFile?: string }
  variant: 'simple-country' | 'title-description-chip' | 'title-description-file'
}

const TabsPanelChange = (props: TabChangeProps) => {
  const { tabActualIndex, index, children, ...otherProps } = props

  return (
    <div
      role="tabpanel"
      hidden={tabActualIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...otherProps}>
      {tabActualIndex === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const TabPanel = ({ tabIndex, index, variant, data, titles }: TabPanelProps) => (
  <TabsPanelChange tabActualIndex={tabIndex} index={index}>
    <Tabs data={data} titles={titles} variant={variant} />
  </TabsPanelChange>
)
export default TabPanel
