import { Request, Response } from "express";
import { BookFindById } from "../../../../../Contexts/Backoffice/Book/application/Find/BookFindById";
import { BookId } from "../../../../../Contexts/Backoffice/Book/domain/BookId";
import httpStatus, { NOT_FOUND } from "http-status";

export class DetailBookController {

  constructor(
    private bookFindById: BookFindById
  ) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;

    const bookFound = await this.bookFindById.run(new BookId(id));

    if(!bookFound) {
      res.status(NOT_FOUND).render('not-found');
    } else {
      res.status(httpStatus.OK).render('book-detail', {
        book: bookFound.toPrimitives(),
        loans: []
      })
    }
  }
}
