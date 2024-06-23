import { Request, Response } from "express";
import { BookGetter } from "../../../../../Contexts/Backoffice/Book/application/GetAll/BookGetter";
import { AuthorGetter } from "../../../../../Contexts/Backoffice/Author/application/GetAll/AuthorGetter";
import { CategoryGetter } from "../../../../../Contexts/Backoffice/Category/application/GetAll/CategoryGetter";

export class MainInfoController {
  constructor(
    private bookGetter: BookGetter,
    private authorGetter: AuthorGetter,
    private categoryGetter: CategoryGetter
  ) {}
  async run(req: Request, res: Response) {

    const [ authors, books, categories ] = await Promise.all([
      this.authorGetter.run(),
      this.bookGetter.run(),
      this.categoryGetter.run()
    ]);
    
    res.render('dashboard', { 
      books: books.map(b => b.toPrimitives()), 
      categories: categories.map(c => c.toPrimitives()), 
      authors: authors.map(a => a.toPrimitives()) 
    });
  }
}
