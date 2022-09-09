import express from 'express';
import { Contenedor } from './../../Clase 4/Desafio/Contenedor.js';

const app = express();

const port = 8080;

const contenedor = new Contenedor('productos.txt');

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.get('/productos', (req,res) => {
    contenedor.getAll().then((objects) => {
        res.send(JSON.stringify(objects,null,2));
    }).catch((err) => {
        res.send('Ups!, something happens!!');
    })
})

app.get('/productoRandom', (req,res) => {
    contenedor.getRandom().then((object) => {
        res.send(JSON.stringify(object,null,2));
    }).catch((err) => {
        res.status(500).send('Ups!, something happens!!');
    })
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});