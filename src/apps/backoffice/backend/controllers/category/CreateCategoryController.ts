import { Request, Response } from "express";
import httpStatus from "http-status";
import { CategoryCreator } from "../../../../../Contexts/Backoffice/Category/application/Create/CategoryCreator";
import { CategoryId } from "../../../../../Contexts/Backoffice/Category/domain/CategoryId";
import { CategoryName } from "../../../../../Contexts/Backoffice/Category/domain/CategoryName";

export class CreateCategoryController {
  constructor(
    private categoryCreator: CategoryCreator
  ) {}

  async run (req: Request, res: Response) {
    const { id, name } = req.body;
    await this.categoryCreator.run({
      id: new CategoryId(id),
      name: new CategoryName(name)
    });
    res.status(httpStatus.CREATED).redirect('/backoffice/');
  }
}
