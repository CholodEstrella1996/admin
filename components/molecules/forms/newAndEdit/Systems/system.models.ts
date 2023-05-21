import { RFile } from 'utils/models/reactFormFieldsTabs'

export type SystemFormModel = {
  title: string
  description: string
  version: string
  executable: RFile[] | null
}
