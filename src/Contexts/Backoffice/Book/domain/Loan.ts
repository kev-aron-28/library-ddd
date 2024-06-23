import { AggregateRoot } from "../../../Shared/AggregateRoot";
import { BookCopy } from "./BookCopy";
import { LoanId } from "./LoanId";
import { LoanDate } from "./LoanDate";
import { LoanReturned } from "./LoanReturned";

export class Loan extends AggregateRoot {
  constructor(
    private readonly id: LoanId,
    private readonly copy: BookCopy,
    private readonly book: { id: string },
    private readonly loanDate: LoanDate,
    private readonly returnDate: LoanDate | null,
    private readonly returned: LoanReturned = new LoanReturned(false)
  ) {
    super();
  }

  static create(data: {
    id: LoanId,
    copy: BookCopy,
    book: { id: string };
    loanDate: LoanDate
  }) {
    return new Loan(
      data.id,
      data.copy,
      data.book,
      data.loanDate,
      null
    );
  }

  static fromPrimitives(plainData: {
    id: string;
    copy: { id: string; format: string; location: string };
    book: { id: string; };
    loanDate: string;
    returnDate: string;
    returned: boolean;
  }) {
    const copy = BookCopy.fromPrimitives({
      format: plainData.copy.format,
      id: plainData.copy.id,
      location: plainData.copy.location
    });

    return new Loan(
      new LoanId(plainData.id),
      copy,
      plainData.book,
      new LoanDate(plainData.loanDate),
      new LoanDate(plainData.returnDate),
      new LoanReturned(plainData.returned)
    );
  }
  
  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      copy: this.copy.toPrimitives(),
      book: this.book.id,
      loanDate: this.loanDate.toString(),
      returnDate: this.returnDate?.toString() || null,
      returned: this.returned.value
    }  
  }
}
