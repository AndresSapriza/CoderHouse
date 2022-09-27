const express = require('express');
const productRouter = require('./routes/products');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8090;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productRouter);


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});