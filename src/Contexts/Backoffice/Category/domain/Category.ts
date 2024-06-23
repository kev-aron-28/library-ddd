import { AggregateRoot } from "../../../Shared/AggregateRoot";
import { CategoryId } from "./CategoryId";
import { CategoryName } from "./CategoryName";

export class Category extends AggregateRoot {

  constructor(
    private readonly id: CategoryId,
    private readonly name: CategoryName
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
  }) {
    return new Category(
      new CategoryId(plainData.id),
      new CategoryName(plainData.name)
    );
  }

  static create(data: {
    id: CategoryId;
    name: CategoryName;
  }) {
    return new Category(
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
