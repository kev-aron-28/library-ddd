import { BookId } from "../../domain/BookId";
import { BookRepository } from "../../domain/BookRepository";

export class BookFindById {
 
  constructor(
    private repository: BookRepository
  ) {}

  async run(id: BookId) {
    return await this.repository.findById(id);
  }
}
