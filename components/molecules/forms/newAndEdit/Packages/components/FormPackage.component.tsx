import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { LanguageTabs } from 'components/molecules/forms/components/LanguageTabs'
import { StoreAdmin } from 'components/molecules/forms/components/StoreAdmin'

import { packageStyles } from '../packages.styles'

const { colors } = theme

export const FormPackage = () => (
  <div className="formPackageNewEdit__container">
    <div className="formPackageNewEdit__tabArea">
      <Typography color={colors.primary[500]} variant="s1">
        Información del paquete
      </Typography>

      <LanguageTabs
        inputs={[
          {
            label: 'Nombre de paquete ',
            name: (code: string) => `step2.tabs.${code}.name`,
            type: 'title',
            rules: { required: true },
          },
          {
            label: 'Descripción del paquete ',
            name: (code: string) => `step2.tabs.${code}.description`,
            type: 'description',
            rules: { required: true },
          },
          {
            label: 'Palabras Clave',
            name: (code: string) => `step2.tabs.${code}.keywords`,
            type: 'keywords',
            rules: { required: true },
          },
        ]}
      />
    </div>

    <Divider orientation="vertical" flexItem />

    <div className="formPackageNewEdit__store">
      <StoreAdmin
        inputs={[
          {
            type: 'disponibility',
            name: 'step2.storePackage.disponibility',
          },
          {
            type: 'icon',
            name: 'step2.storePackage.icon',
            rules: { required: true },
          },
          {
            type: 'associatedMedia',
            name: 'step2.storePackage.associatedMedia',
            rules: { required: true },
          },
        ]}
      />
    </div>

    <style jsx>{packageStyles}</style>
  </div>
)
