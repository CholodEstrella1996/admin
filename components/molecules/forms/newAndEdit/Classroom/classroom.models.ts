import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'

export type ClassRoomFormModel = {
  customer: InputSelectOption
  classroomLicence: InputSelectOption
  offlineActivations?: number
  installations?: number
  licenceNumber: string
  startDate: string
  endDate?: string
  status: InputSelectOption
}
