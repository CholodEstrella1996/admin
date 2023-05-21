import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

import { InstitutionProps } from './institution.model'
import { InstitutionStyles, InstitutionGlobalStyles } from './institution.styles'
import TabContent from './TabContent'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ pt: 5 }}>{children}</Box>}
    </div>
  )
}

function allTabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const InstitutionComponent = ({
  role,
  data,
  deleteUser,
  onSearch,
  subscriptionData,
  listStatus,
  isLoading,
  onDownload,
}: InstitutionProps) => {
  const { colors } = theme
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const router = useRouter()
  const { reset } = useFormContext()

  // Se muestra la tabla para monouser o DEMO y padre
  const NotTabsTable =
    (subscriptionData?.kind.name === 'monouser-shared' ||
      subscriptionData?.kind.name === 'demo-shared') &&
    subscriptionData?.customer.kind.name === 'parent'

  const routerLink = router.asPath.split('/', 3)[1].split('-', 1).toString()
  const routerId = router.asPath.split('/', 3)[2].split('-', 1).toString()

  const totalEmails =
    Number(subscriptionData?.userCount) -
    (Number(subscriptionData?.activeInvites) + Number(subscriptionData?.activeMembers))

  const hasNotEmails = totalEmails <= 0

  return (
    <>
      <section className="section__headers">
        <Typography variant="s2" color={colors.neutrals[400]} className="header_label__title">
          Suscripción
        </Typography>

        <button
          type="button"
          onClick={() => void router.push(`/${routerLink}/${routerId}`)}
          className="header__back__arrow">
          <ArrowBackIcon sx={{ fontSize: 37 }} />
        </button>

        <Typography
          variant="h5"
          color={colors.primary[500]}
          weight="bold"
          className="headerLabel__sub__title">
          #{subscriptionData.customer?.id} - {subscriptionData.customer?.name}
        </Typography>
      </section>

      {NotTabsTable ? (
        <TabContent
          listStatus={listStatus}
          data={data}
          pageChange={(newPage: number) => {
            role('family-child', newPage)
          }}
          profile="hijos"
          route="family_child"
          deleteUser={deleteUser}
          onSearch={onSearch}
          isLoading={isLoading}
          onDownloadExcel={onDownload}
          isDisabledButton={hasNotEmails}
        />
      ) : (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              background: `${colors.neutrals.white}`,
              overflow: 'hidden',
              borderRadius: '1rem',
            }}>
            <Tabs
              sx={{
                '& .Mui-selected': {
                  color: `${colors.primary[500]} !important`,
                  fontWeight: '600',
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: colors.primary[500],
                },
              }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth">
              <Tab
                onClick={() => {
                  role('organization-student', 0)
                  reset()
                }}
                label="Estudiantes"
                {...allTabProps(0)}
                className="tab__items"
              />
              <Tab
                onClick={() => {
                  role('organization-teacher', 0)
                  reset()
                }}
                label="Profesores"
                {...allTabProps(1)}
                className="tab__items"
              />
              <Tab
                onClick={() => {
                  role('organization-director', 0)
                  reset()
                }}
                label="directores"
                {...allTabProps(2)}
                className="tab__items"
              />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <TabContent
              listStatus={listStatus}
              data={data}
              pageChange={(newPage: number) => {
                role('organization-student', newPage)
              }}
              profile="Estudiantes"
              route="student_invitation"
              deleteUser={deleteUser}
              onSearch={onSearch}
              isLoading={isLoading}
              onDownloadExcel={onDownload}
              isDisabledButton={hasNotEmails}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TabContent
              listStatus={listStatus}
              data={data}
              pageChange={(newPage: number) => {
                role('organization-teacher', newPage)
              }}
              profile="Profesores"
              route="teacher_invitation"
              deleteUser={deleteUser}
              onSearch={onSearch}
              isLoading={isLoading}
              onDownloadExcel={onDownload}
              isDisabledButton={hasNotEmails}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TabContent
              listStatus={listStatus}
              data={data}
              pageChange={(newPage: number) => {
                role('organization-director', newPage)
              }}
              profile="Directores"
              route="director_invitation"
              deleteUser={deleteUser}
              onSearch={onSearch}
              isLoading={isLoading}
              onDownloadExcel={onDownload}
              isDisabledButton={hasNotEmails}
            />
          </TabPanel>
        </Box>
      )}

      <style jsx>{InstitutionStyles}</style>
      <style jsx global>
        {InstitutionGlobalStyles}
      </style>
    </>
  )
}

export default InstitutionComponent
