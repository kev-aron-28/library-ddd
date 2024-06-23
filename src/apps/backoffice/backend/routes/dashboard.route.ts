import { Request, Response, Router } from "express";
import container from "../dependency-injection";
import { MainInfoController } from "../controllers/dashboard/MainInfoController";

export const register = (router: Router) => {
  const mainInfoController: MainInfoController = container.get('Apps.backoffice.controllers.MainInfoController');
  router.get('/backoffice/', (req: Request, res: Response) => mainInfoController.run(req, res));
}
