import { AggregateRoot } from "../../../Shared/AggregateRoot";
import { BookCopyFormat } from "./BookCopyFormat";
import { BookCopyId } from "./BookCopyId";
import { BookCopyLocation } from "./BookCopyLocation";

export class BookCopy extends AggregateRoot {
  constructor(
    private readonly id: BookCopyId,
    private readonly format: BookCopyFormat,
    private readonly location: BookCopyLocation
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    format: string;
    location: string;
    loans?: {
      id: string;
      book: {
        id: string;
      };
      loanDate: string; // Suponiendo que las fechas se manejan como objetos Date
      returnDate?: string; // Este campo es opcional
      returned: boolean;
    }[]
  }) {
    const copy = new BookCopy(
      new BookCopyId(plainData.id),
      new BookCopyFormat(plainData.format),
      new BookCopyLocation(plainData.location)
    )
    
    return copy;
  } 

  static create (data: {
    id: BookCopyId,
    format: BookCopyFormat,
    location: BookCopyLocation
  }) {
    return new BookCopy(
      data.id,
      data.format,
      data.location
    )
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      format: this.format.toString(),
      location: this.location.toString()
    }
  }
}
