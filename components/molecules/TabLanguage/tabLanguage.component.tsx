/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Box, Tab, Tabs } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import { Content } from 'utils/models/modelsBase'

import TabLanguageStyle from './tabLanguage.style'
import TabPanel from './tabPanel/tabPanel.component'

const { colors } = theme

type TabLanguageProps = {
  secctionAppType?: boolean
  sectionAppName?: string
  apiData: Content[]
  titles: { name: string; description?: string; attachChipFile?: string }
  variant: 'simple-country' | 'title-description-chip' | 'title-description-file'
}

const TabLanguage = (props: TabLanguageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { secctionAppType, sectionAppName, variant, titles, apiData } = props
  const [tabIndex, setTabIndex] = useState(0)

  const methods = useForm<{ applicationType: number }>()

  const languages = [
    { id: 0, name: 'English' },
    { id: 1, name: 'Español' },
    { id: 2, name: 'Português' },
    { id: 3, name: 'Türkiye' },
  ]

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const tabSelector = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  })

  const getDataByLenguage = (index: number) => apiData[index]

  useEffect(() => {
    methods.reset({ applicationType: apiData[0].type?.id })
  }, [apiData])

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <div className="input__row">
            <div className="input__column space__select">
              {variant !== 'title-description-file' && apiData[0]?.type && (
                <div>
                  <Typography color={colors.neutrals[400]} variant="label">
                    Tipo de aplicación
                  </Typography>
                  <Typography color={colors.neutrals[300]} variant="s2">
                    {[apiData[0].type.name]}
                  </Typography>
                </div>
              )}
            </div>
            <div className="input__column space__select">
              {apiData[0]?.classroomCode && (
                <div>
                  <Typography color={colors.neutrals[400]} variant="label">
                    Código de Aula
                  </Typography>
                  <Typography color={colors.neutrals[300]} variant="s2">
                    {[apiData[0].classroomCode]}
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <Tabs
            TabIndicatorProps={{ style: { backgroundColor: colors.primary[500] } }}
            sx={{
              '.css-1orkduw-MuiButtonBase-root-MuiTab-root.Mui-selected ': {
                color: colors.primary[500],
              },
            }}
            value={tabIndex}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example">
            {apiData.map(({ language }) => (
              <Tab
                key={language.id}
                className="tab-names"
                sx={{ color: `${colors.neutrals[400]}`, textTransform: 'initial' }}
                label={<Typography variant="s1">{language.name}</Typography>}
                {...tabSelector(language.id)}
              />
            ))}
          </Tabs>
        </Box>

        {languages.map(({ id }) => (
          <TabPanel
            key={id}
            index={id}
            tabIndex={tabIndex}
            variant={variant}
            data={getDataByLenguage(id)}
            titles={titles}
          />
        ))}

        <style jsx>{`
          ${TabLanguageStyle()}
        `}</style>
      </Box>
    </FormProvider>
  )
}

export default TabLanguage
