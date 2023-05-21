import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { useFormContext } from 'react-hook-form'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { InputText } from 'components/atoms/inputs/InputText'
import { InputToggle } from 'components/atoms/inputs/InputToggle'
import { useInputSelectContext } from 'utils/contexts/inputSelect.context'

import { subscriptionStyles } from '../subscription.styles'

const { colors } = theme

export const BillingStep = () => {
  // Hooks
  const methods = useFormContext()
  const { watch } = methods

  const { options } = useInputSelectContext()

  // Data
  const kindSelected = watch('step2.kind') as InputSelectOption

  // Render
  return (
    <div className="container-billing">
      <Typography color={colors.primary[500]} variant="s1">
        Datos de facturación
      </Typography>

      <div className="content-billing">
        <InputToggle name="step2.fillFields" title="Llenar datos desde cliente" withLabelRight />
        <InputSelect
          name="step2.kind"
          options={options?.invoicingKinds ?? []}
          label="Facturar a"
          rules={{ required: true }}
        />
      </div>

      <div className="content-billing">
        {kindSelected?.name === 'organization' ? (
          <InputText
            name="step2.businessName"
            label="Razón social"
            rules={{ required: true, maxLength: 100 }}
          />
        ) : (
          <div className="content-billing">
            <InputText
              name="step2.firstName"
              label="Nombre"
              rules={{ required: true, maxLength: 50 }}
            />

            <InputText
              name="step2.surname"
              label="Apellido"
              rules={{ required: true, maxLength: 50 }}
            />
          </div>
        )}
      </div>

      <div className="content-billing">
        <InputSelect
          name="step2.country"
          options={options?.countries ?? []}
          label="País"
          size="small"
          rules={{ required: true }}
          withSearch
        />

        <InputSelect
          name="step2.state"
          options={options?.states ?? []}
          label="Provincia/Estado"
          size="small"
          rules={{ required: true }}
          withSearch
        />

        <InputSelect
          name="step2.city"
          options={options?.cities ?? []}
          label="Ciudad"
          size="small"
          rules={{ required: true }}
          withSearch
        />
      </div>

      <div className="content-billing">
        {kindSelected?.name === 'organization' ? (
          <InputSelect
            name="step2.identityType"
            options={options?.identitiesOrg ?? []}
            label="Tipo ID"
            rules={{ required: true }}
          />
        ) : (
          <InputSelect
            name="step2.identityType"
            options={options?.identities ?? []}
            label="Tipo ID"
            rules={{ required: true }}
          />
        )}

        <InputText name="step2.identityNumber" label="ID" rules={{ required: true }} />
      </div>

      <div className="content-billing">
        <div className="input-user2">
          <InputText
            name="step2.address"
            label="Domicilio"
            rules={{ required: true, maxLength: 100 }}
          />
        </div>
        <div className="input-user1">
          <InputText
            name="step2.postalCode"
            label="Código Postal"
            type="number"
            rules={{ required: true }}
          />
        </div>
      </div>

      <div className="content-billing">
        <InputText
          name="step2.email"
          type="email"
          size="medium"
          label="Correo electrónico"
          rules={{ required: true, maxLength: 50 }}
        />
        <InputText
          name="step2.phoneNumber"
          size="medium"
          label="Teléfono"
          rules={{ required: true }}
        />
      </div>

      <style jsx>{subscriptionStyles}</style>
    </div>
  )
}
