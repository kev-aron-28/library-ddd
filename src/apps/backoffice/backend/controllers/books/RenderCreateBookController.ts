import { Request, Response } from "express";
import { AuthorGetter } from "../../../../../Contexts/Backoffice/Author/application/GetAll/AuthorGetter";
import { CategoryGetter } from "../../../../../Contexts/Backoffice/Category/application/GetAll/CategoryGetter";
import { OK } from "http-status";

export class RenderCreateBookController {
  constructor(
    private authorGetter: AuthorGetter,
    private categoryGetter: CategoryGetter
  ) {}

  async run(req: Request, res: Response) {
    const infoToDisplayOnTemplate = [this.authorGetter.run(), this.categoryGetter.run()];

    const [ authors, categories ] = await Promise.all(infoToDisplayOnTemplate)
    res.status(OK).render('new-book', { 
      authors: authors.map(a => a.toPrimitives()), 
      categories: categories.map(c => c.toPrimitives()) 
    });
  }
}
