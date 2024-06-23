import { BookRepository } from "../../domain/BookRepository";

export class BookFinder {
  constructor(
    private repository: BookRepository
  ) {}

  async run(key: string) {
    return await this.repository.find(key);
  }
}
