const express = require('express');
require('dotenv').config();

const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

const app = express();

const port = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use((req, res) => {
    res.status(404).send({error: -2, descripcion: `route ${req.baseUrl}${req.url} method ${req.method} doesn't exist!`});
});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});