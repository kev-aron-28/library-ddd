import { PrismaClient } from "@prisma/client";
import { Author } from "../domain/Author";
import { AuthorRepository } from "../domain/AuthorRepository";
import { AuthorId } from "../domain/AuthorId";
import { AuthorName } from "../domain/AuthorName";

export class PrismaAuthorRepository implements AuthorRepository {
  private readonly prismaClient = new PrismaClient().author;
  async save(author: Author): Promise<void> {
    await this.prismaClient.create({
      data: {
        id: author.toPrimitives().id,
        name: author.toPrimitives().name
      }
    })
  }

  async getAll(): Promise<Author[]> {
    const authorsDB = await this.prismaClient.findMany({});
    
    if(authorsDB.length == 0) {
      return []
    }
    
    const authorsDomain = authorsDB.map(authorDb => Author.create({
      id: new AuthorId(authorDb.id),
      name: new AuthorName(authorDb.name)
    }));

    return authorsDomain
  }
}
