import { Request, Response } from "express";
import { CREATED } from "http-status";
import { BookCreator } from "../../../../../Contexts/Backoffice/Book/application/Create/BookCreator";
import { Author } from "../../../../../Contexts/Backoffice/Author/domain/Author";
import { Category } from "../../../../../Contexts/Backoffice/Category/domain/Category";
import { BookCopy } from "../../../../../Contexts/Backoffice/Book/domain/BookCopy";
import { Book } from "../../../../../Contexts/Backoffice/Book/domain/Book";
import { BookId } from "../../../../../Contexts/Backoffice/Book/domain/BookId";
import { BookIsbn } from "../../../../../Contexts/Backoffice/Book/domain/BookIsbn";
import { BookTitle } from "../../../../../Contexts/Backoffice/Book/domain/BookTitle";

export class CreateBookController {
  constructor(
    private bookCreator: BookCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const {
      id: bookId,
      title,
      isbn,
      author,
      categories,
      copies
    } = req.body;

    const authorObject = typeof author === 'string' ? JSON.parse(author) : author;

    const categoriesObject = typeof categories === 'string' ? JSON.parse(categories) : categories;

    const { id: authorId, name: authorName } = authorObject;
    

    const authorDomain = Author.fromPrimitives({ id: authorId, name: authorName });

    const categoriesDomain = categoriesObject.map((category: { id: string; name: string; }) => 
      Category.fromPrimitives({ id: category.id, name: category.name })
    );

    const copiesDomain = copies.map((copy: { id: string; format: string; location: string }) => 
      BookCopy.fromPrimitives({
        id: copy.id,
        format: copy.format,
        location: copy.location
      })
    );
    

    try {
      await this.bookCreator.run({
        id: new BookId(bookId),
        title: new BookTitle(title),
        isbn: new BookIsbn(isbn),
        author: authorDomain,
        categories: categoriesDomain,
        copies: copiesDomain
      });
      res.status(201).redirect('/backoffice/');
    } catch (error) {
      res.render('error', {
        message: 'Error',
        error: {}
    });
    }
    
  }
}
