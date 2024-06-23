import { Request, Response } from "express";
import httpStatus from "http-status";

export class HealthGetController {
  async run(req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).render('health', { message: 'Hola mundo' })
  }
}
