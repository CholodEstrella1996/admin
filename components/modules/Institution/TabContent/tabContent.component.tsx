/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputText } from 'components/atoms/inputs/InputText'
import { formatData } from 'components/modules/Institution/TabContent/parserDataTable'
import TableDataInstitution from 'components/molecules/Tables/TableDataInstitution'

import { DataFilter, ProfileProps } from '../institution.model'
import { TabContentStyles, TabContentGlobalStyles } from './tabContent.styles'

const TabContentComponent = ({
  profile,
  route,
  data,
  listStatus,
  pageChange,
  deleteUser,
  onSearch,
  isLoading,
  onDownloadExcel,
  isDisabledButton,
}: ProfileProps) => {
  const { colors } = theme

  const msg = {
    notEmail: 'Email no disponible ',
    guestUser: 'Usuario invitado',
    registeredUser: 'Usuario registrado',
  }
  const methods = useFormContext<DataFilter>()

  const router = useRouter()
  const routerId = router.asPath.split('/', 3)[2].split('-', 1).toString()

  const inviteRoute = async (link: string): Promise<void> => {
    await router.push(`/customer/${routerId}/${link}`)
  }

  useEffect(() => {
    const subscription = methods.watch((values) => {
      if (values.searchQuery || values.status) void onSearch()
    })
    return () => subscription.unsubscribe()
  }, [methods.watch])

  const getProfileName = (prof: string) => {
    if (prof === 'Directores' || prof === 'Profesores') return prof.slice(0, -2)
    return prof.slice(0, -1)
  }

  const rows = formatData(data, msg.notEmail, msg.guestUser, msg.registeredUser)
  return (
    <>
      <div className="tabPanel__card">
        <div className="tabPanel__card__header">
          <span>
            <Typography className="tabPanel__title" variant="h6" color={colors.primary[500]}>
              {profile.charAt(0).toUpperCase() + profile.slice(1)}
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {data.totalElements === 1
                ? `1 ${getProfileName(profile)} cargado`
                : `${data.totalElements} ${profile} cargados`}
            </Typography>
          </span>

          <div className="tabContent__buttons">
            {!!data.content.length && (
              <Button
                size="medium"
                variant="outlined"
                icon={<DownloadOutlined />}
                iconPosition="left"
                onClick={onDownloadExcel}>
                Descargar Excel
              </Button>
            )}
            <Button
              icon={<AddIcon />}
              iconPosition="left"
              size="medium"
              disabled={isDisabledButton}
              onClick={() => void inviteRoute(route)}>
              {`Invitar ${profile.toLowerCase()}`}
            </Button>
          </div>
        </div>

        <div className="subscription_filters_content">
          <InputText
            label="Buscar"
            name="searchQuery"
            size="medium"
            placeholder="Nombre, apellido o correo electrónico."
            withClear
          />

          <InputSelect
            label="Estado"
            name="status"
            options={listStatus}
            size="small"
            placeholder="Todos"
            withClear
            withSearch
          />
        </div>

        <div className="tabPanel__card__table">
          <TableDataInstitution
            rows={rows}
            totalElements={data.totalElements}
            pageSize={data.size}
            activePage={data.number}
            pageChange={pageChange}
            deleteUser={(id) => deleteUser(id)}
            profile={route.includes('director') ? '' : route}
            isLoading={isLoading}
          />
        </div>
      </div>
      <style jsx>{TabContentStyles}</style>
      <style jsx global>
        {TabContentGlobalStyles}
      </style>
    </>
  )
}
export default TabContentComponent
