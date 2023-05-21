export type TermsConditionsRequest = {
  postTermsConditions: PostTermsConditions
}

// Endpoints
type PostTermsConditions = {
  title: string
  active: boolean
  version: string
  description?: string
  translations?: {
    description: string
    languageCode: string
  }[]
}
