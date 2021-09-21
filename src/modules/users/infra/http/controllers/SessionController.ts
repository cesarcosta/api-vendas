import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateSessionService from '../../../services/CreateSessionService';
import { container } from 'tsyringe';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = container.resolve(CreateSessionService);

    const user = await createSessionService.execute({ email, password });

    return response.status(200).json(classToClass(user));
  }
}
