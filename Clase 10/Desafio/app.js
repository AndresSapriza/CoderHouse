import express from 'express';
import productsApi from './api/productsApi.js';

const app = express();

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',express.static('public'));

app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
    let products = productsApi.getAll();
	res.render('home',{ products });
});

app.get('/products', (req, res) => {
	res.render('productForm');
});

app.post('/products', (req, res) => {
    productsApi.add(req.body);
    res.redirect('/');
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});