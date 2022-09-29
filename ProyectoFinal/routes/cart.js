const express = require('express');
const cartApi = require('./../controller/cartManager');

const cartRouter = express.Router();


cartRouter.get('/:id/products', (req, res) => {
    cartApi.getById(req.params.id).then((response) => {
        if(response.OK){
            res.status(200).json(response.products);
        } else {
            res.status(404).send(response.message);
        }
    }).catch((err) => {
        res.status(500).send('Oops!, something happens!!');
    });
});

cartRouter.post('/', (req, res) => {
    cartApi.add().then((response) => {
        if(response.OK){
            res.status(200).json(response.id);
        } else {
            res.status(404).send(response.message);
        }
    }).catch((err) => {
        res.status(500).send('Oops!, something happens!!');
    });    
});

cartRouter.post('/:id/products', (req, res) => {
    cartApi.addProduct(req.params.id,req.body.id).then((response) => {
        if(response.OK){
            res.status(200).json(response.message);
        } else {
            res.status(404).send(response.message);
        }
    }).catch((err) => {
        res.status(500).send('Oops!, something happens!!');
    });  
});

cartRouter.delete('/:id', (req, res) => {
    cartApi.delete(req.params.id).then(() => {
        res.status(200).send(`Cart deleted!`);
    }).catch((err) => {
        res.status(500).send('Ups!, something happens!!');
    });
});

cartRouter.delete('/:id/products/:id_prod', (req, res) => {
    cartApi.removeProduct(req.params.id,req.params.id_prod).then((response) => {
        if(response.OK){
            res.status(200).json(response.message);
        } else {
            res.status(404).send(response.message);
        }
    }).catch((err) => {
        res.status(500).send('Ups!, something happens!!');
    });
});


module.exports = cartRouter;