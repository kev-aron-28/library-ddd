import { CategoryRepository } from "../../domain/CategoryRepository";

export class CategoryGetter {

  constructor(
    private repository: CategoryRepository
  ) {}

  async run() {
    return await this.repository.getAll();
  }
}
