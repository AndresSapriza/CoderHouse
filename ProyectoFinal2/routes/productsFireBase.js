import ProductControllerFireBase from "../controller/ProductControllerFireBase.js";
import express from 'express';

const productRouterFireBase = express.Router();


productRouterFireBase.get('/:id?', ProductControllerFireBase.get);

productRouterFireBase.post('/', ProductControllerFireBase.add);

productRouterFireBase.put('/:id', ProductControllerFireBase.update);

productRouterFireBase.delete('/:id', ProductControllerFireBase.delete);

export default productRouterFireBase; 