import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthorCreator } from "../../../../../Contexts/Backoffice/Author/application/Create/AuthorCreator";
import { AuthorId } from "../../../../../Contexts/Backoffice/Author/domain/AuthorId";
import { AuthorName } from "../../../../../Contexts/Backoffice/Author/domain/AuthorName";

export class CreateAuthorController {

  constructor(
    private readonly authorCreator: AuthorCreator
  ) {}
  async run(req: Request, res: Response) {
    const { id, name } = req.body
    
    await this.authorCreator.run({
      id: new AuthorId(id),
      name: new AuthorName(name)
    })
    
    res.status(httpStatus.CREATED).redirect('/backoffice/');
  }
}
