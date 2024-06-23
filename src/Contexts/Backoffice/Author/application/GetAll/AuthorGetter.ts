import { AuthorRepository } from "../../domain/AuthorRepository";

export class AuthorGetter {
  constructor(
    private repository: AuthorRepository
  ) {}

  async run() {
    return await this.repository.getAll();
  }
}
