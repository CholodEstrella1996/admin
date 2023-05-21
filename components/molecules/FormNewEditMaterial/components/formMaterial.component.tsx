import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { LanguageTabs } from 'components/molecules/forms/components/LanguageTabs'
import { Options } from 'utils/models/reactFormFieldsTabs'

import FormEditMaterialStyles from '../formNewEditMaterial.styles'
import Detail from './detail.component'

const { colors } = theme

type FormEditMaterialProps = {
  typeOptions: Options[]
  authoritiesOptions: Options[]
}

const FormEditMaterial = ({ typeOptions, authoritiesOptions }: FormEditMaterialProps) => (
  <>
    <div className="edit__material__container">
      <div className="tab__container">
        <Typography variant="s1" color={colors.primary[500]} className="tab__title">
          Información del Material
        </Typography>

        <LanguageTabs
          inputs={[
            {
              label: 'Nombre del material',
              name: (code) => `materialName${code}`,
              type: 'title',
              rules: { required: true },
            },
            {
              label: 'Descripción del material',
              name: (code) => `materialDescription${code}`,
              type: 'description',
              rules: { required: true },
            },
            {
              label: 'Archivo Asociado',
              name: (code) => `file${code}`,
              type: 'associatedFile',
              rules: { required: true },
            },
          ]}
        />
      </div>

      <Divider orientation="vertical" />

      <div className="detail__container">
        <Detail typeOptions={typeOptions} authoritiesOptions={authoritiesOptions} />
      </div>
    </div>
    <style jsx>{FormEditMaterialStyles}</style>
  </>
)

export default FormEditMaterial
