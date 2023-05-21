export type ClassroomRequest = {
  postInvites: SendInvites
}

export type SendInvites = {
  classroomIds?: number[]
  emailList: string[]
  languageCode: string
  message?: string
  role?: string
}
