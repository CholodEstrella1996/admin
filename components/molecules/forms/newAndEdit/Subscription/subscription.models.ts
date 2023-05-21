import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { TreeSelectorNode } from 'components/molecules/trees/TreeSelector/treeSelector.models'

export type SubscriptionFormModel = {
  step1: {
    customer: InputSelectOption
  }
  step2: {
    fillFields?: boolean
    kind: InputSelectOption
    firstName?: string
    surname?: string
    businessName?: string
    country: InputSelectOption
    state?: InputSelectOption
    city?: InputSelectOption
    identityType: InputSelectOption
    identityNumber: string
    address: string
    postalCode: number
    email: string
    phoneNumber: string
  }
  step3: {
    kind: InputSelectOption
    installationCount?: number
    accessCount?: number
    userCount?: number
    allowedAccess?: number
    isLtiServerExternal?: InputSelectOption[]
    ltiServerLocation?: InputSelectOption
    ltiSupportForAndroid?: InputSelectOption
    ltiErrorMessage: string
    startDate: string
    endDate?: string
    status: InputSelectOption
    dayCount?: number
  }
  step4: {
    search: string
    applications: Omit<TreeSelectorNode, 'children'>[]
  }
  step5: {
    finalPrice: number
  }
}
