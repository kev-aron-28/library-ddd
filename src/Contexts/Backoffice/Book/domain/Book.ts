import { AggregateRoot } from "../../../Shared/AggregateRoot";
import { Author } from "../../Author/domain/Author";
import { Category } from "../../Category/domain/Category";
import { BookCopy } from "./BookCopy";
import { BookId } from "./BookId";
import { BookIsbn } from "./BookIsbn";
import { BookTitle } from "./BookTitle";
import { Loan } from "./Loan";

export class Book extends AggregateRoot {
  private loans: Loan[] = [];
  constructor(
    private readonly id: BookId,
    private readonly title: BookTitle,
    private readonly isbn: BookIsbn,
    private readonly author: Author,
    private readonly categories: Category[],
    private readonly copies: BookCopy[]
  ) {
    super();
  }
  
  static fromPrimitives(plainData: {
    id: string;
    title: string;
    isbn: string;
    author: { id: string; name: string; };
    categories: { id: string; name: string}[];
    copies: { id: string; format: string; location: string, loans?: any[]}[]; 
  }) {
    const categories = plainData.categories.map(cat => Category.fromPrimitives(cat));
    const copies = plainData.copies.map(cop => BookCopy.fromPrimitives(cop));

    return new Book(
      new BookId(plainData.id),
      new BookTitle(plainData.title),
      new BookIsbn(plainData.isbn),
      Author.fromPrimitives(plainData.author),
      categories,
      copies
    );
  }

  static create(data: {
    id: BookId,
    title: BookTitle,
    isbn: BookIsbn,
    author: Author,
    categories: Category[],
    copies: BookCopy[]
  }) {
    return new Book(
      data.id,
      data.title,
      data.isbn,
      data.author,
      data.categories,
      data.copies
    );
  }

  loanHistory(loansHistory: Loan[]) {
    this.loans = loansHistory;
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      title: this.title.toString(),
      isbn: this.isbn.toString(),
      author: this.author.toPrimitives(),
      categories: this.categories.map(cat => cat.toPrimitives()),
      copies: this.copies.map(cop => cop.toPrimitives()),
      loans: this.loans.map(loan => loan.toPrimitives())
    }
  }
}
