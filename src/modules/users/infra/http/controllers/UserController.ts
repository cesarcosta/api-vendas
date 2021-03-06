import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import { container } from 'tsyringe';

export default class UserController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute();

    return response.status(200).json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json(classToClass(user));
  }
}
