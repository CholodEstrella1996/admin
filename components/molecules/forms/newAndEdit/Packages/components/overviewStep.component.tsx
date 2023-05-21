/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { AttachMoney } from '@mui/icons-material'

import { InputText } from 'components/atoms/inputs/InputText'
import { SelectedProducts } from 'components/modules/SelectedProducts/selectedProducts.component'

import { usePackageContext } from '../contexts/package.context'
import { packageStyles } from '../packages.styles'

const { colors } = theme

export const OverviewStep = () => {
  const { value } = usePackageContext()

  return (
    <div className="overview-container">
      <div className="overview-drop-down-card1">
        <DropDownCard1 title="Paquete" isOpen colorTitle={colors.primary[500]}>
          <div className="overview-data">
            <div className="overview-data-row-between">
              <div className="overview-data-par">
                <Typography variant="label" color={colors.neutrals[400]}>
                  Nombre *
                </Typography>
                <Typography variant="s2" color={colors.neutrals[400]}>
                  {value?.name}
                </Typography>
              </div>
            </div>

            <div className="overview-data-par">
              <Typography variant="label" color={colors.neutrals[400]}>
                total de las aplicaciones seleccionadas *
              </Typography>
              <Typography variant="s2" color={colors.neutrals[400]}>
                ${value?.price}
              </Typography>
            </div>
            <div className="overview-input">
              <InputText
                withLeftSpacing={false}
                name="step3.price"
                label="Precio final del paquete (USD)"
                rules={{ required: true }}
                size="small"
                type="number"
                icon={<AttachMoney sx={{ color: colors.neutrals[400], fontSize: '16px' }} />}
                iconPosition="left"
              />
            </div>
          </div>
        </DropDownCard1>
      </div>

      <div className="overview-products">
        <Typography variant="s1" color={colors.primary[500]}>
          Productos seleccionados
        </Typography>
        {value && <SelectedProducts products={value.packagesByKind} />}
      </div>

      <style jsx>{packageStyles}</style>
    </div>
  )
}
