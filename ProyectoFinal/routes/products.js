const express = require('express');
const productApi = require('./../controller/productManager');

const productRouter = express.Router();


productRouter.get('/:id?', (req, res) => {

    productApi.get(req.params.id).then((product) => {
        if(product){
            res.status(200).json(product);
        } else {
            res.status(404).send(`Sorry, product doesn't exist!`);
        }
    }).catch((err) => {
        res.status(500).send('Ups!, something happens!!');
    });
});

productRouter.post('/', (req, res) => {
    
    productApi.add(req.body).then((response) => {
            if (response.OK){
                res.status(200).send(`{"id":${response.id}}`);
            } else {
                res.status(400).send(response.message);
            }
        }).catch((err) => {
            res.status(500).send('Ups!, something happens!!');
        })
    
});

productRouter.put('/:id', (req, res) => {
    productApi.update(req.params.id,req.body).then(() => {
        res.status(200).send(`Product updated!`);
    }).catch((err) => {
        res.status(500).send('Ups!, something happens!!');
    });  
});

productRouter.delete('/:id', (req, res) => {
    productApi.delete(req.params.id).then(() => {
        res.status(200).send(`Product deleted!`);
    }).catch((err) => {
        res.status(500).send('Ups!, something happens!!');
    });
});

module.exports = productRouter;