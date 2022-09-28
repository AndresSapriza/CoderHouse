const express = require('express');
require('dotenv').config();

const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

const app = express();

const port = process.env.PORT || 8090;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});