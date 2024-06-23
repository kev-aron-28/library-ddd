import { Author } from "../../../Author/domain/Author";
import { Category } from "../../../Category/domain/Category";
import { Book } from "../../domain/Book";
import { BookCopy } from "../../domain/BookCopy";
import { BookId } from "../../domain/BookId";
import { BookIsbn } from "../../domain/BookIsbn";
import { BookRepository } from "../../domain/BookRepository";
import { BookTitle } from "../../domain/BookTitle";

export class BookCreator {

  constructor(
    private bookRepository: BookRepository
  ) {}

  async run(params: {
    id: BookId,
    title: BookTitle,
    isbn: BookIsbn,
    author: Author,
    categories: Category[],
    copies: BookCopy[]
  }) {
    const book = Book.create({
      id: params.id,
      title: params.title,
      isbn: params.isbn,
      author: params.author,
      categories: params.categories,
      copies: params.copies      
    })

    await this.bookRepository.save(book);
  }
}
