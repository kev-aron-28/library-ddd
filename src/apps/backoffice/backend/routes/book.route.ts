import { Request, Response, Router } from "express";
import container from "../dependency-injection";
import { CreateCategoryController } from "../controllers/category/CreateCategoryController";
import { CreateBookController } from "../controllers/books/CreateBookController";
import { RenderCreateBookController } from "../controllers/books/RenderCreateBookController";
import { FindBookController } from "../controllers/books/FindBookController";
import { DetailBookController } from "../controllers/books/DetailBookController";
import { LoanBookController } from "../controllers/books/LoanBookController";
import { ReturnBookController } from "../controllers/books/ReturnBookController";

export const register = (router: Router) => {
  const createBookController: CreateBookController = container.get('Apps.backoffice.controllers.CreateBookController');
  const renderCreateBookController: RenderCreateBookController = container.get('Apps.backoffice.controllers.RenderCreateBookController');
  const findBookController: FindBookController = container.get('Apps.backoffice.controllers.FindBookController');
  const detailController: DetailBookController = container.get('Apps.backoffice.controllers.DetailBookController');
  const loanBookController: LoanBookController = container.get('Apps.backoffice.controllers.LoanBookController');
  const returnBookController: ReturnBookController = container.get('Apps.backoffice.controllers.ReturnBookController');

  console.log(returnBookController)

  router.post('/backoffice/books/new', (req: Request, res: Response) => createBookController.run(req, res));
  router.get('/backoffice/books/new', (req: Request, res: Response) => renderCreateBookController.run(req, res));
  router.post('/backoffice/books/search', (req: Request, res: Response) => findBookController.run(req, res));
  router.get('/backoffice/books/:id/detail', (req: Request, res: Response) => detailController.run(req, res));
  router.post('/backoffice/books/loans', (req: Request,  res: Response) => loanBookController.run(req, res));
  router.post('/backoffice/books/loans/:id/return', (req: Request, res: Response) => returnBookController.run(req, res));
  
}
