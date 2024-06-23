import { Book } from "./Book";
import { BookId } from "./BookId";
import { Loan } from "./Loan";
import { LoanId } from "./LoanId";

export interface BookRepository {
  save(book: Book): Promise<void>;
  getAll(): Promise<Book[]>;
  find(key: string): Promise<Book[]>;
  findById(id: BookId): Promise<Book | null>;
  loan(loan: Loan): Promise<void>;
  return(loanId: LoanId): Promise<void>;
}
