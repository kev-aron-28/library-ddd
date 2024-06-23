import { Author } from "./Author";

export interface AuthorRepository {
  save(author: Author): Promise<void>;
  getAll(): Promise<Author[]>;
}
