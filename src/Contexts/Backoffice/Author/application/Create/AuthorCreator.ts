import { Author } from "../../domain/Author";
import { AuthorId } from "../../domain/AuthorId";
import { AuthorName } from "../../domain/AuthorName";
import { AuthorRepository } from "../../domain/AuthorRepository";

export class AuthorCreator {
  constructor(
    private repository: AuthorRepository
  ) {}

  async run(params: {
    id: AuthorId,
    name: AuthorName,
  }) {
    const author = Author.create({ id: params.id, name: params.name});
    await this.repository.save(author);
  }
}
