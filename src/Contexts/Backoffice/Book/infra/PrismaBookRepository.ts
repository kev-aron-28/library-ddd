import { PrismaClient } from "@prisma/client";
import { Book } from "../domain/Book";
import { BookRepository } from "../domain/BookRepository";
import { BookId } from "../domain/BookId";
import { Loan } from "../domain/Loan";
import { LoanId } from "../domain/LoanId";

export class PrismaBookRepository implements BookRepository {
  private readonly prismaClient = new PrismaClient();

  async save(book: Book): Promise<void> {
    
    const bookPrimitives = book.toPrimitives();
    const categoriesIds = bookPrimitives.categories.map(cat => cat.id)
    const copies = bookPrimitives.copies

    try {
      await this.prismaClient.book.create({
        data: {
          id: bookPrimitives.id,
          title: bookPrimitives.title,
          isbn: bookPrimitives.isbn,
          author: {
            connect: {
              id: bookPrimitives.author.id
            }
          },
          categories: {connect: categoriesIds.map(catId => ({ id: catId })) },
          copies: { create: copies.map(copy => ({ id: copy.id, format: copy.format, location: copy.location })) }
        }
      });
    } catch (err) {
      throw new Error('Failed to create');
    }
  }

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

  async findById(id: BookId): Promise<Book | null> {
    
    const bookIdDB = await this.prismaClient.book.findFirst({
      where: {
        id: id.toString()
      },
      include: {
        author: true,
        categories: true,
        copies: {
          include: {
            loans: {
              include: {
                book: {
                  select: {
                    id: true
                  }
                },
                copy: true
              }
            }
          }
        },
        loans: {
          include: {
            book: {
              select: {
                id: true
              }
            },
            copy: true
          }
        }
      }
    })

    if(!bookIdDB) {
      return null
    }

    const generalLoans = bookIdDB.loans.map((l) => Loan.fromPrimitives({
      id: l.id,
      copy: { format: l.copy.format, id: l.copy.id, location: l.copy.location! },
      book: { id: l.bookId },
      loanDate: l.loanDate.toLocaleString(),
      returnDate: l.returnDate?.toLocaleString() || "",
      returned: l.returned
    }))


    const bookDomain = Book.fromPrimitives({
      id: bookIdDB.id,
      title: bookIdDB.title,
      isbn: bookIdDB.isbn,
      author: {
        id: bookIdDB.author.id,
        name: bookIdDB.author.name
      },
      categories: bookIdDB.categories.map((cat) => ({ id: cat.id, name: cat.name })),
      copies: bookIdDB.copies.map((cop) => ({ 
        format: cop.format, 
        id: cop.id, 
        location: cop.location!, 
        loans: cop.loans.map(l => ({ 
          id: l.id, 
          book: { id: bookIdDB.id },
          loanDate: l.loanDate,
          returnDate: l.returnDate,
          returned: l.returned
      }),

  )}
    )),
  })

    bookDomain.loanHistory(generalLoans);

    return bookDomain;
  }

  async loan(loan: Loan): Promise<void> {    
    const loanPlain = loan.toPrimitives();
    await this.prismaClient.loan.create({
      data: {
        id: loanPlain.id,
        copy: {
          connect: {
            id: loanPlain.copy.id
          },
        },
        book: {
          connect: {
            id: loanPlain.book
          }
        },
        loanDate: loanPlain.loanDate
      }
    });
  }
  
  async return(loanId: LoanId): Promise<void> {
    await this.prismaClient.loan.update({
      where: {
        id: loanId.toString()
      },
      data: {
        returnDate: new Date().toISOString(),
        returned: true
      }
    })
  }
}
