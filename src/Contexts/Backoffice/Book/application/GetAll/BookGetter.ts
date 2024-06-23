import { BookRepository } from "../../domain/BookRepository";

export class BookGetter {

  constructor(
    private repository: BookRepository
  ) {}

  async run() {
    return await this.repository.getAll();
  }
}
