import { Request, Response, Router } from "express";
import { OK } from "http-status";
import { LandingController } from "../controllers/LandingController";
import container from "../dependency-injection";

export const register = (router: Router) => {
  const landingController: LandingController = container.get('Apps.library.controllers.LandingController');
  console.log(landingController)
  router.get('/', (req: Request, res: Response) => landingController.run(req, res));
}
