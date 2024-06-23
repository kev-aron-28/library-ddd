import { Request, Response } from "express";
import httpStatus from "http-status";

export class HealthController {
  async run(req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).render('health')
  }
}
