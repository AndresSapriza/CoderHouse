import express from 'express';
import productsApi from '../api/productsApi.js';

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    let products = productsApi.getAll()
	res.json(products);
});

productRouter.get('/:id', (req, res) => {
    let product = productsApi.getById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(400).send(`Product doesn't exist!`);
    }
	
});

productRouter.post('/', (req, res) => {
    let id = productsApi.add(req.body);
	res.send(`{"id":${id}}`);
});

productRouter.put('/:id', (req, res) => {
    let product = productsApi.getById(req.params.id);
    if(product){
        productsApi.update(req.params.id,req.body);
        res.send(`OK`);
    }else{
        res.status(400).send(`Product doesn't exist!`);
    }
});

productRouter.delete('/:id', (req, res) => {
    let product = productsApi.getById(req.params.id);
    if(product){
        productsApi.delete(req.params.id);
        res.send(`OK`);
    }else{
        res.status(400).send(`Product doesn't exist!`);
    }
});

export default productRouter;