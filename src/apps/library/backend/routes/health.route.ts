import { Request, Response, Router } from "express";
import { OK } from "http-status";

export const register = (router: Router) => {
  router.get('/health', (req: Request, res: Response) => res.status(OK).send());
}
