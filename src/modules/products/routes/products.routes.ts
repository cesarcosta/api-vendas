import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();

const productController = new ProductController();

productsRouter.get('/', productController.index);

productsRouter.get('/:id', productController.show);

productsRouter.post('/', productController.create);

productsRouter.put('/:id', productController.update);

productsRouter.delete('/:id', productController.delete);

export default productsRouter;
