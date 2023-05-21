export type GroupBase = {
  publisher: Publisher
  book: Book
  bookTopic: BookTopic
  country: Country
  curriculum: Curriculum
  subject: Subject
  grade: Grade
  gradeTopic: GradeTopic
}

type Base = {
  name: string
  visible: boolean
  parentId: number
}

type Publisher = Base & {
  kind: 'publisher'
  icon: string
}

type Book = Base & {
  kind: 'book'
  year: number
  areaId: number
  tagIds: number[]
}

type BookTopic = Base & {
  kind: 'topic'
}

type Country = Base & {
  kind: 'country'
  icon: string
  translations: {
    name: string
    languageCode: string
  }[]
}

type Curriculum = Base & {
  kind: 'curriculum'
  description: string
  year: number
}

type Subject = Base & {
  kind: 'subject'
  description: string
}

type Grade = Base & {
  kind: 'grade'
  description: string
}

type GradeTopic = Base & {
  kind: 'topic'
  description: string
}
