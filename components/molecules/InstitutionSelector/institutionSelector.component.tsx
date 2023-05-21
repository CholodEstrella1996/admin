import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import { TreeSelectorModal } from '../modals/TreeSelectorModal'

export type InstitutionSelectorComponentProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

export const InstitutionSelectorComponent = ({
  formLoadProps,
}: InstitutionSelectorComponentProps) => {
  // Render
  const steps = [
    {
      id: 1,
      element: <TreeSelectorModal selectorName="institutions" searchInputName="search" />,
    },
  ]

  return <FormLoad steps={steps} {...formLoadProps} />
}
