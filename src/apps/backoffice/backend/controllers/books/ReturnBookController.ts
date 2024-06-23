import { Request, Response } from "express";
import { BookReturner } from "../../../../../Contexts/Backoffice/Book/application/Return/BookReturner";
import { LoanId } from "../../../../../Contexts/Backoffice/Book/domain/LoanId";
import { OK } from "http-status";
import { BookLoaner } from "../../../../../Contexts/Backoffice/Book/application/Loan/BookLoaner";

export class ReturnBookController {
  constructor(
    private bookReturner: BookReturner
  ) {}

  async run (req: Request, res: Response) {
    const { id } = req.params;
    await this.bookReturner.run({
      id: new LoanId(id)
    });

    res.status(OK).redirect('/backoffice/');
  }
}
