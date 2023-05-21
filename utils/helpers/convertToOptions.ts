import { OptionProps } from 'components/atoms/inputs/InputSelectMulti/select.models'
import { IdName, IdNameDisplay } from 'services/models/member.model'

export const optionsDisplay = (optionsList: IdNameDisplay[]) => {
  const editedOptions: OptionProps[] = optionsList.map((item: IdNameDisplay) => ({
    id: item.id,
    value: item.name,
    label: item.displayName,
  }))
  return editedOptions
}

export const optionsDisplayName = (optionsList: IdName[]) => {
  const editedOptions: OptionProps[] = optionsList.map((item: IdName) => ({
    id: item.id,
    value: item.name,
    label: item.name,
  }))
  return editedOptions
}
