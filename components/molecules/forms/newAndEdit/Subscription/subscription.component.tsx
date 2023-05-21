import { FormLoad, FormLoadProps } from '../../components/FormLoad'
import { ApplicationSelectorStep } from './components/applicationSelectorStep.component'
import { BillingStep } from './components/billingStep.component'
import { CustomerStep } from './components/customerStep.component'
import { OverviewStep } from './components/overviewStep.component'
import { SubscriptionStep } from './components/subscriptionStep.component'

export type SubscriptionComponentProps = {
  isNewForm: boolean
  formLoadProps: Pick<
    FormLoadProps,
    'title' | 'finishButtonText' | 'onClose' | 'onSubmit' | 'loading'
  >
}

export const SubscriptionComponent = ({ formLoadProps, isNewForm }: SubscriptionComponentProps) => {
  // Render
  const steps = [
    { id: 1, element: <CustomerStep /> },
    { id: 2, element: <BillingStep /> },
    { id: 3, element: <SubscriptionStep /> },
    { id: 4, element: <ApplicationSelectorStep /> },
    { id: 5, element: <OverviewStep />, withBackground: false },
  ]
  const stepsEdit = [
    { id: 2, element: <BillingStep /> },
    { id: 3, element: <SubscriptionStep /> },
    { id: 4, element: <ApplicationSelectorStep /> },
    { id: 5, element: <OverviewStep />, withBackground: false },
  ]

  return <FormLoad steps={isNewForm ? steps : stepsEdit} {...formLoadProps} />
}
