import express from 'express';
import productsApi from './api/productsApi.js';
import { Server } from 'socket.io';

const app = express();

const port = 8080;

const server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',express.static('public'));

io.on('connection', socket => {
    console.log(`New user connected! ${socket.id}`);
    let products = productsApi.getAll();
    io.emit('history',products);
    socket.on('products', data => {
        let id = productsApi.add(data);
        let products = productsApi.getAll();
        io.emit('history',products);
    })

    socket.on('message', data => {
        io.emit('chat',data);
    })
});

app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
	res.render('home');
});


