import { AggregateRoot } from "../../../Shared/AggregateRoot";
import { AuthorId } from "./AuthorId";
import { AuthorName } from "./AuthorName";

export class Author extends AggregateRoot {

  constructor(
    private id: AuthorId,
    private name: AuthorName
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    name: string;
    id: string;
  }) {
    return new Author(
      new AuthorId(plainData.id),
      new AuthorName(plainData.name)
    );
  }

  static create(data: {
    id: AuthorId;
    name: AuthorName;
  }) {
    return new Author(
      data.id,
      data.name
    );
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.toString()
    }
  }
}
