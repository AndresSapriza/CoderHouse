const express = require('express');
const productApi = require('./../controller/productManager');

const productRouter = express.Router();


productRouter.get('/:id', (req, res) => {

    productApi.getById(req.params.id).then((product) => {
        if(product){
            res.json(product);
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
                res.send(`{"id":${response.id}}`);
            } else {
                res.status(400).send(response.message);
            }
        }).catch((err) => {
            res.status(500).send('Ups!, something happens!!');
        })
    
});

productRouter.put('/:id', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');    
});

productRouter.delete('/:id', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');
});

module.exports = productRouter;