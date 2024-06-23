import { Request, Response } from "express";
import { BookLoaner } from "../../../../../Contexts/Backoffice/Book/application/Loan/BookLoaner";
import { CREATED } from "http-status";
import { LoanId } from "../../../../../Contexts/Backoffice/Book/domain/LoanId";
import { LoanDate } from "../../../../../Contexts/Backoffice/Book/domain/LoanDate";
import { BookCopy } from "../../../../../Contexts/Backoffice/Book/domain/BookCopy";

export class LoanBookController {

  constructor(
    private bookLoaner: BookLoaner
  ) {}

  async run(req: Request, res: Response) {
    const { book, copy, loanDate, id } = req.body;
    
    const copyObject = JSON.parse(copy);
   
    const copyPlain = BookCopy.fromPrimitives({
      format: copyObject.format,
      id: copyObject.id,
      location: copyObject.location
    });

    await this.bookLoaner.run({
      id: new LoanId(id),
      loanDate: new LoanDate(new Date(loanDate).toISOString()),
      bookId: { id: book },
      bookCopy: copyPlain
    })
    
    res.status(CREATED).redirect('dashboard');
  }
}
