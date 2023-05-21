import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { Options } from 'utils/models/reactFormFieldsTabs'

import FormEditMaterialStyles from '../formNewEditMaterial.styles'

const { colors } = theme

type Props = {
  typeOptions: Options[]
  authoritiesOptions: Options[]
}

const Detail = ({ authoritiesOptions, typeOptions }: Props) => (
  <>
    <Typography variant="s1" color={colors.primary[500]}>
      Detalles del material
    </Typography>

    <div className="detail__type">
      <div className="type__select">
        <InputSelect
          name="materialType"
          label="Tipo de Material"
          options={typeOptions}
          rules={{ required: true }}
        />
      </div>
    </div>

    <div className="detail__authorities">
      <div className="authorities__select">
        <InputSelect
          name="materialAuthorities"
          label="Destinatarios del material"
          options={authoritiesOptions}
          rules={{ required: true }}
        />
      </div>
    </div>
    <style jsx>{FormEditMaterialStyles}</style>
  </>
)

export default Detail
