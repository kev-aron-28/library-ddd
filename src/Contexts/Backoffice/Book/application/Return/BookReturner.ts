import { BookRepository } from "../../domain/BookRepository";
import { LoanId } from "../../domain/LoanId";

export class BookReturner {
  constructor(
    private repository: BookRepository
  ) {}

  async run(params: {
    id: LoanId
  }) {
    await this.repository.return(params.id);
  }
}
