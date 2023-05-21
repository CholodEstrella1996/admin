import { RFile } from 'utils/models/reactFormFieldsTabs'

export type FormNewEditEditorialProps = {
  isNewForm: boolean
  idEditorial?: number | undefined
  onSubmit?: () => Promise<void>
  onClose: () => void
}

export type FormNewEditEditorialModel = {
  editorialName: string
  editorialIcon: RFile[]
  editorialDisponibility: boolean
}

export type ApiResponseEditorial = {
  id: number
  name: string
  description: string
  visible: boolean
  iconUrl: string
  kind?: string
}

export type PostEditorialModel = {
  data: { name: string; visible: boolean; kind: string; parentId: 1 }
  icon: RFile[]
}
