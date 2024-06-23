import { Category } from "../../domain/Category";
import { CategoryId } from "../../domain/CategoryId";
import { CategoryName } from "../../domain/CategoryName";
import { CategoryRepository } from "../../domain/CategoryRepository";

export class CategoryCreator {
  constructor(
    private repository: CategoryRepository
  ) {}
  async run(params: {
    id: CategoryId;
    name: CategoryName;
  }) {
    const category = Category.create({ id: params.id, name: params.name });
    await this.repository.save(category);
  }
}
