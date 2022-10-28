import startDb from './db/mongodb.js';
import express from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/products.js';
import cartRouter from './routes/carts.js';
import productRouterFireBase from './routes/productsFireBase.js';
import cartRouterFireBase from './routes/cartsFireBase.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

startDb();

app.use('/api/products', productRouter);
app.use('/api/productsFireBase', productRouterFireBase);
app.use('/api/carts', cartRouter);
app.use('/api/cartsFireBase', cartRouterFireBase);
app.use((req, res) => {
    res.status(404).send({error: -2, descripcion: `route ${req.baseUrl}${req.url} method ${req.method} doesn't exist!`});
});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});