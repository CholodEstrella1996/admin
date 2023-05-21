/* import { PostPutBook } from 'services/models/book.model'
import { bookService } from 'services/modules/book.module'

import { FormNewAnnouncementModel } from './formNewAnnouncement.model' */

const FormNewAnnouncementService = async (): Promise<number> =>
  /*  const {
    bookDisponibility,
    bookTitle,
    bookYearPublication,
    bookArea,
    bookGrade,
    bookLevel,
    bookEdition,
  } = data

  const bodyDataBook: PostPutBook = {
    name: bookTitle,
    tagIds: [bookGrade?.id, bookLevel?.id].filter((item) => item !== undefined),
    kind: 'book',
    visible: bookDisponibility,
    year: bookYearPublication,
    areaId: bookArea.id,
    parentId: idEditorial,
    edition: bookEdition,
  }

  if (isNewForm) {
    const responsePostBook = await bookService.postNewBook(bodyDataBook)
    return responsePostBook.data.id
  }
  if (!isNewForm !== undefined) {
    const responsePutBook = await bookService.putBook(idBook, bodyDataBook)
    return responsePutBook.data.id
  } */
  -1

export default FormNewAnnouncementService
