import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Tab, Tabs } from '@mui/material'

const { colors } = theme

export type LanguageTabComponentProps = {
  languages: {
    id: number
    name: string
    hasError: boolean
  }[]
  currentIndex: number
  onTabChange: (index: number) => void
}

export const LanguageTabComponent = (props: LanguageTabComponentProps) => {
  // Props
  const { languages, currentIndex, onTabChange } = props

  // Styles
  const tabIndicatorStyles = { backgroundColor: colors.primary[500] }

  const tabsStyles = {
    '.css-1orkduw-MuiButtonBase-root-MuiTab-root.Mui-selected ': { color: colors.primary[500] },
  }
  const boxStyles = { borderBottom: 1, borderColor: 'divider' }
  const iconStyles = { color: colors.semantic.danger }

  // Props
  const tabSelectorProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  })

  // Render
  return (
    <Box sx={boxStyles}>
      <Tabs
        value={currentIndex}
        onChange={(_, newValue: number) => onTabChange(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        TabIndicatorProps={{ style: tabIndicatorStyles }}
        sx={tabsStyles}>
        {!!languages.length &&
          languages?.map(({ id, name, hasError }) => (
            <Tab
              key={id}
              sx={{ color: `${colors.neutrals[400]}`, textTransform: 'initial' }}
              label={
                hasError ? (
                  <div className="tab--error">
                    <Typography variant="s1" color={colors.semantic.danger}>
                      {name}
                    </Typography>

                    <ErrorOutlineIcon sx={iconStyles} width="0.8em" height="0.8em" />
                  </div>
                ) : (
                  <Typography variant="s1">{name}</Typography>
                )
              }
              {...tabSelectorProps(id)}
            />
          ))}
      </Tabs>

      <style jsx>{`
        .tab--error {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </Box>
  )
}
