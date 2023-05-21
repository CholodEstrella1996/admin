export type Section = {
  title: string
  pages: Page[]
}

type Page = {
  icon: React.ElementType
  name: string
  url: string
}
