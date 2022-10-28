import CartController from "../controller/CartController.js";
import express from 'express';

const cartRouter = express.Router();


cartRouter.get('/:id/products',CartController.get);

cartRouter.post('/', CartController.add);

cartRouter.post('/:id/products',CartController.addProduct );

cartRouter.delete('/:id',CartController.delete);

cartRouter.delete('/:id/products/:id_prod', CartController.removeProduct);


export default cartRouter;