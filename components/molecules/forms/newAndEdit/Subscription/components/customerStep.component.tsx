import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { useInputSelectContext } from 'utils/contexts/inputSelect.context'

import { subscriptionStyles } from '../subscription.styles'

const { colors } = theme

export const CustomerStep = () => {
  // Hooks
  const { options } = useInputSelectContext()

  // Render
  return (
    <div className="container-customer">
      <Typography color={colors.primary[500]} variant="s1">
        Información del cliente
      </Typography>

      <div className="content-customer">
        <InputSelect
          name="step1.customer"
          options={options?.customers ?? []}
          label="Cliente"
          rules={{ required: true }}
          size="small"
          withSearch
        />
      </div>

      <style jsx>{subscriptionStyles}</style>
    </div>
  )
}
