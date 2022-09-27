const express = require('express');

const productRouter = express.Router();


productRouter.get('/:id', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');
});

productRouter.post('/', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');    
});

productRouter.put('/:id', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');    
});

productRouter.delete('/:id', (req, res) => {
    res.status(404).send('Sorry, we are working on it!');
});

export default productRouter;