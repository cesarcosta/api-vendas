import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateSessionService from '../../../services/CreateSessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();

    const user = await createSessionService.execute({ email, password });

    return response.status(200).json(classToClass(user));
  }
}
