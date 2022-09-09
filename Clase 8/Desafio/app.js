import express from 'express';
import productRouter from './routes/products.js';

const app = express();

const port = 8080;


app.use(express.json());
app.use('/',express.static('public'));
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
	res.send('Hello world');
});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});