import { Request, Response, Router } from "express";
import container from "../dependency-injection";
import { CreateAuthorController } from "../controllers/authors/CreateAuthorController";

export const register = (router: Router) => {
  const createAuthorController: CreateAuthorController = container.get('Apps.backoffice.controllers.CreateAuthorController');
  router.post('/backoffice/authors/new', (req: Request, res: Response) => createAuthorController.run(req, res));
  router.get('/backoffice/authors/new', (req: Request, res: Response) => res.render('new-author'));
}
