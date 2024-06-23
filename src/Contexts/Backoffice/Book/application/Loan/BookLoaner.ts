import { BookCopy } from "../../domain/BookCopy";
import { BookRepository } from "../../domain/BookRepository";
import { Loan } from "../../domain/Loan";
import { LoanDate } from "../../domain/LoanDate";
import { LoanId } from "../../domain/LoanId";

export class BookLoaner {
  constructor(
    private repository: BookRepository
  ) {}

  async run(params: {
    id: LoanId,
    bookCopy: BookCopy,
    bookId: { id: string };
    loanDate: LoanDate;
  }) {

    const loan = Loan.create(
      {
        book: params.bookId,
        id: params.id,
        copy: params.bookCopy,
        loanDate: params.loanDate,
      }
    );
    await this.repository.loan(loan);
  }
}
