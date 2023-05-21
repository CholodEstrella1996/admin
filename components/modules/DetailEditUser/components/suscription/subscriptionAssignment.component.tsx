import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { SelectedProducts } from 'components/modules/SelectedProducts/selectedProducts.component'
import { FormLoad, FormLoadProps } from 'components/molecules/forms/components/FormLoad'

import { DetailEditUserLocalStyles } from '../../detailEditUser.styles'
import { mock } from './mocks'

const { colors } = theme
type FormNewEditSystemProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

export const SubscriptionAssignmentCompoment = (props: FormNewEditSystemProps) => {
  const { formLoadProps } = props

  const subscriptionAssignmentForm = (
    <div className="overview-container">
      <div className="content-customer">
        <InputSelect
          name="suscription"
          options={[]}
          label="SUSCRIPCIÓN "
          rules={{ required: true }}
          size="small"
          withSearch
        />
      </div>
      <div className="overview-products">
        <Typography variant="s1" color={colors.primary[500]}>
          Productos incluidos
        </Typography>
        <SelectedProducts products={mock} />
      </div>

      <style jsx>{DetailEditUserLocalStyles}</style>
    </div>
  )
  const step = [{ id: 1, element: subscriptionAssignmentForm, withBackground: false }]

  return <FormLoad steps={step} {...formLoadProps} />
}
