import CartControllerFireBase from "../controller/cartControllerFireBase.js";
import express from 'express';

const cartRouterFireBase = express.Router();


cartRouterFireBase.get('/:id/products',CartControllerFireBase.get);

cartRouterFireBase.post('/', CartControllerFireBase.add);

cartRouterFireBase.post('/:id/products',CartControllerFireBase.addProduct );

cartRouterFireBase.delete('/:id',CartControllerFireBase.delete);

cartRouterFireBase.delete('/:id/products/:id_prod', CartControllerFireBase.removeProduct);


export default cartRouterFireBase;