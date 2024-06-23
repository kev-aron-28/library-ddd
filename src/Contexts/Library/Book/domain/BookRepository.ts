import { Book } from "./Book";

export interface BookRepository {
  getAll(): Promise<Book[]>;
  find(key: string): Promise<Book[]>;
}
