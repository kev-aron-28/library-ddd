import { Request, Response, Router } from "express";
import container from "../dependency-injection";
import { CreateCategoryController } from "../controllers/category/CreateCategoryController";

export const register = (router: Router) => {
  const createCategoryController: CreateCategoryController = container.get('Apps.backoffice.controllers.CreateCategoryController');
  router.post('/backoffice/categories/new', (req: Request, res: Response) => createCategoryController.run(req, res));
  router.get('/backoffice/categories/new', (req: Request, res: Response) => res.render('new-category'));
}
