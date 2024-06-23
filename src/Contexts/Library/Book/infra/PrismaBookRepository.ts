import { PrismaClient } from "@prisma/client";
import { Book } from "../domain/Book";
import { BookRepository } from "../domain/BookRepository";
import { BookId } from "../domain/BookId";

export class PrismaBookRepository implements BookRepository {
  private readonly prismaClient = new PrismaClient();

  async getAll(): Promise<Book[]> {
    const booksDB = await this.prismaClient.book.findMany({
      include: {
        author: true,
        categories: true,
        copies: true
      }
    });

    if(booksDB.length == 0) {
      return []
    }

    const booksDomain = booksDB.map(book => Book.fromPrimitives({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      author: {
        id: book.author.id,
        name: book.author.name
      },
      categories: book.categories.map((cat) => ({ id: cat.id, name: cat.name })),
      copies: book.copies.map((cop) => ({ format: cop.format, id: cop.id, location: cop.location! }))
    }));

    return booksDomain
  }

  async find(key: string): Promise<Book[]> {
    const booksFoundDB = await this.prismaClient.book.findMany({
      where: {
        OR: [
          {
            isbn: {
              contains: key,
              mode: 'insensitive',
            }
          },
          {
            author: {
              name: {
                contains: key,
                mode: 'insensitive',
              }
            }
          },
          {
            title: {
              contains: key,
              mode: 'insensitive',
            }
          }
        ]
      },
      include: {
        author: true,
        categories: true,
        copies: true
      }
    });


    if(booksFoundDB.length == 0) {
      return []
    }

    const booksFoundDomain = booksFoundDB.map(book => Book.fromPrimitives({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      author: {
        id: book.author.id,
        name: book.author.name
      },
      categories: book.categories.map((cat) => ({ id: cat.id, name: cat.name })),
      copies: book.copies.map((cop) => ({ format: cop.format, id: cop.id, location: cop.location! }))
    }));


    return booksFoundDomain;
  }

 
}
