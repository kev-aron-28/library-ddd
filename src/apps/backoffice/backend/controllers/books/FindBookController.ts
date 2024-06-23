import { Request, Response } from "express";
import { BookFinder } from "../../../../../Contexts/Backoffice/Book/application/Find/BookFinder";
import { OK } from "http-status";

export class FindBookController {
  
  constructor(private bookFinder: BookFinder) {}

  async run(req: Request, res: Response) {
    const { key } = req.body;
    console.log(key)
    const booksFound = await this.bookFinder.run(key);

    res.status(OK).render('search-results', {
      books: booksFound
    })
  }
}
