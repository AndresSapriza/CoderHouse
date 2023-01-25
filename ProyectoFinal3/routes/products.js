import ProductController from "../controller/ProductController.js";
import express from 'express';

const productRouter = express.Router();


productRouter.get('/:id?', ProductController.get);

productRouter.post('/', ProductController.add);

productRouter.put('/:id', ProductController.update);

productRouter.delete('/:id', ProductController.delete);

export default productRouter; 