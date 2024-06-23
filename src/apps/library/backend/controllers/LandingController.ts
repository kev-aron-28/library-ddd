import { Request, Response } from "express";
import { OK } from "http-status";
import { BookFinder } from "../../../../Contexts/Library/Book/application/Find/BookFinder";
import { BookGetter } from "../../../../Contexts/Library/Book/application/GetAll/BookGetter";

export class LandingController {

  constructor(
    private bookFinder: BookFinder,
    private bookGetter: BookGetter
  ) {}

  async run(req: Request, res: Response) {
    let books = [];

    const search: string = (req.query.search as string || '');
    
    if(!search) {
      books = await this.bookGetter.run();
    } else {
      books = await this.bookFinder.run(search);
    }

    res.status(OK).render('landing', {
      books,
      searchQuery: search
    })
  } 
}
