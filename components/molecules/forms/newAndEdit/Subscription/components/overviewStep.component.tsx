import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { AttachMoney } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'

import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { InputText } from 'components/atoms/inputs/InputText'
import { SelectedProducts } from 'components/modules/SelectedProducts/selectedProducts.component'

import { useSubscriptionContext } from '../contexts/subscription.context'
import { subscriptionStyles } from '../subscription.styles'

const { colors } = theme

export const OverviewStep = () => {
  const { value } = useSubscriptionContext()
  const methods = useFormContext()
  const subscriptionKind = methods.watch('step3.kind') as InputSelectOption

  return (
    <div className="overview-container">
      <div className="overview-drop-down-card1">
        <DropDownCard1
          title={value?.customer.kind.displayName ?? ''}
          isOpen
          colorTitle={colors.primary[500]}>
          {subscriptionKind.name === 'lms-lti' && (
            <div className="overview-data">
              <div className="overview-data-row-between">
                <div className="overview-data-par">
                  <Typography variant="label" color={colors.neutrals[400]}>
                    Nombre *
                  </Typography>
                  <Typography variant="s2" color={colors.neutrals[400]}>
                    {value?.customer.name}
                  </Typography>
                </div>
              </div>
              <div className="overview-data-par">
                <Typography variant="label" color={colors.neutrals[400]}>
                  cantidad de usuarios *
                </Typography>
                <Typography variant="s2" color={colors.neutrals[400]}>
                  {value?.userCount}
                </Typography>
              </div>
              <div className="overview-data-par">
                <Typography variant="label" color={colors.neutrals[400]}>
                  total de las aplicaciones seleccionadas *
                </Typography>
                <Typography variant="s2" color={colors.neutrals[400]}>
                  ${value?.finalPrice}
                </Typography>
              </div>
              <div className="overview-input">
                <InputText
                  withLeftSpacing={false}
                  name="step5.finalPrice"
                  label="Precio final del paquete (USD)"
                  rules={{ required: true }}
                  size="small"
                  type="number"
                  icon={<AttachMoney sx={{ color: colors.neutrals[400], fontSize: '16px' }} />}
                  iconPosition="left"
                />
              </div>
            </div>
          )}
          {(subscriptionKind.name === 'monouser-individual' ||
            subscriptionKind.name === 'monouser-shared') && (
            <div className="overview-data">
              <div className="overview-data-par">
                <Typography variant="label" color={colors.neutrals[400]}>
                  Nombre *
                </Typography>
                <Typography variant="s2" color={colors.neutrals[400]}>
                  {value?.customer.name}
                </Typography>
              </div>
              <div className="overview-data-row">
                {subscriptionKind.name !== 'monouser-individual' && (
                  <div className="overview-data-par">
                    <Typography variant="label" color={colors.neutrals[400]}>
                      usuarios adic. *
                    </Typography>
                    <Typography variant="s2" color={colors.neutrals[400]}>
                      {value?.userCount}
                    </Typography>
                  </div>
                )}
                <div className="overview-data-par">
                  <Typography variant="label" color={colors.neutrals[400]}>
                    Cant. accesos
                  </Typography>
                  <Typography variant="s2" color={colors.neutrals[400]}>
                    {value?.allowedAccess}
                  </Typography>
                </div>
              </div>
              <div className="overview-data-par">
                <Typography variant="label" color={colors.neutrals[400]}>
                  total de las aplicaciones seleccionadas *
                </Typography>
                <Typography variant="s2" color={colors.neutrals[400]}>
                  ${value?.finalPrice}
                </Typography>
              </div>
              <div className="overview-input">
                <InputText
                  withLeftSpacing={false}
                  name="step5.finalPrice"
                  label="Precio final del paquete (USD)"
                  rules={{ required: true }}
                  size="small"
                  type="number"
                  icon={<AttachMoney sx={{ color: colors.neutrals[400], fontSize: '16px' }} />}
                  iconPosition="left"
                />
              </div>
            </div>
          )}

          {!(
            subscriptionKind.name === 'lms-lti' ||
            subscriptionKind.name === 'monouser-individual' ||
            subscriptionKind.name === 'monouser-shared'
          ) && (
            <div className="overview-data">
              <div className="overview-data-par">
                <Typography variant="label" color={colors.neutrals[400]}>
                  Nombre *
                </Typography>
                <Typography variant="s2" color={colors.neutrals[400]}>
                  {value?.customer.name}
                </Typography>
              </div>
              {subscriptionKind?.name === 'demo-individual' ||
              subscriptionKind?.name === 'demo-shared' ? (
                <div className="overview-demo">
                  {subscriptionKind?.name !== 'demo-individual' && (
                    <div className="overview-data-par">
                      <Typography variant="label" color={colors.neutrals[400]}>
                        usuarios adic. *
                      </Typography>
                      <Typography variant="s2" color={colors.neutrals[400]}>
                        {value?.userCount}
                      </Typography>
                    </div>
                  )}
                  <div className="overview-data-par">
                    <Typography variant="label" color={colors.neutrals[400]}>
                      Cant. accesos
                    </Typography>
                    <Typography variant="s2" color={colors.neutrals[400]}>
                      {value?.allowedAccess}
                    </Typography>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overview-data-par">
                    <Typography variant="label" color={colors.neutrals[400]}>
                      instalaciones permitidas *
                    </Typography>
                    <Typography variant="s2" color={colors.neutrals[400]}>
                      {value?.installationCount}
                    </Typography>
                  </div>
                  <div className="overview-data-par">
                    <Typography variant="label" color={colors.neutrals[400]}>
                      total de las aplicaciones seleccionadas *
                    </Typography>
                    <Typography variant="s2" color={colors.neutrals[400]}>
                      ${value?.finalPrice}
                    </Typography>
                  </div>
                  <div className="overview-input">
                    <InputText
                      withLeftSpacing={false}
                      name="step5.finalPrice"
                      label="Precio final del paquete (USD)"
                      rules={{ required: true }}
                      size="small"
                      type="number"
                      icon={<AttachMoney sx={{ color: colors.neutrals[400], fontSize: '16px' }} />}
                      iconPosition="left"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </DropDownCard1>
      </div>

      <div className="overview-products">
        <Typography variant="s1" color={colors.primary[500]}>
          Productos seleccionados
        </Typography>
        {value && <SelectedProducts products={value.packagesByType} />}
      </div>

      <style jsx>{subscriptionStyles}</style>
    </div>
  )
}
