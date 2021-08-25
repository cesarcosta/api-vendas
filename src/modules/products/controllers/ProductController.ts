import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();

    const products = await listProductService.execute();

    return response.status(200).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProductService = new ShowProductService();

    const product = await showProductService.execute({ id });

    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({ name, price, quantity });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProductService = new UpdateProductService();

    await updateProductService.execute({ id, name, price, quantity });

    return response.status(204).end();
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute({ id });

    return response.status(204).end();
  }
}
