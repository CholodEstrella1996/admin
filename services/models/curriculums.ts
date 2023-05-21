export type PostPutAssignature = {
  description: string
  kind: string
  name: string
  parentId: number
  visible: boolean
}
export type ApiResponseAssignature = {
  id: number
  name: string
  description: string
  visible: boolean
  kind: string
  year?: number
}
// TODO: agregar los demás modelos de datos para el flujo de Curriculums
