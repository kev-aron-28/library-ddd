import { Request, Response, Router } from "express";
import container from "../dependency-injection";
import { HealthGetController } from "../controllers/HealthGetController";
import { OK } from "http-status";

export const register = (router: Router) => {
  router.get('/backoffice/health', (req: Request, res: Response) => res.status(OK).send());
}
