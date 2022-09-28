const express = require('express');

const cartRouter = express.Router();


cartRouter.get('/:id/products', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');
});

cartRouter.post('/', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');    
});

cartRouter.post('/:id/products', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');    
});

cartRouter.delete('/:id', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');
});

cartRouter.delete('/:id/productos/:id_prod', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');
});


module.exports = cartRouter;