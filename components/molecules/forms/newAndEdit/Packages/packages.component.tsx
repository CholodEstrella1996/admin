import { FormLoad, FormLoadProps } from '../../components/FormLoad'
import { FormPackage } from './components/FormPackage.component'
import { OverviewStep } from './components/overviewStep.component'
import { TreeStep } from './components/TreeStep.component'

export type PackageComponentProps = {
  isNewForm: boolean
  formLoadProps: Pick<
    FormLoadProps,
    'title' | 'finishButtonText' | 'onClose' | 'onSubmit' | 'loading'
  >
}

export const PackageComponent = ({ formLoadProps, isNewForm }: PackageComponentProps) => {
  // Render
  const steps = [
    { id: 1, element: <TreeStep /> },
    { id: 2, element: <FormPackage /> },
    { id: 2, element: <OverviewStep />, withBackground: false },
  ]

  const stepsEdit = [
    { id: 1, element: <TreeStep /> },
    { id: 2, element: <FormPackage /> },
    { id: 2, element: <OverviewStep />, withBackground: false },
  ]

  return <FormLoad steps={isNewForm ? steps : stepsEdit} {...formLoadProps} />
}
