const express = require('express');
const dbApi = require('./api/dbApi.js');
const { Server } = require('socket.io');
const optionsMysql = require('../options/mariaDB');
const optionsSqlLite = require('../options/sqllite3');

const app = express();

const port = 3000;

const server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',express.static('src/public'));

const productsApi = new dbApi(optionsMysql,"products");
const chatApi = new dbApi(optionsSqlLite,"chats");

io.on('connection', socket => {
    console.log(`New user connected! ${socket.id}`);

    productsApi.getAll().then((rows) => {
       let products = JSON.parse(JSON.stringify(rows));
       io.emit('history',products);
    });

    socket.on('sended', data => {
        console.debug('sended');
        chatApi.getAll().then((rows) => {
            let chats = JSON.parse(JSON.stringify(rows));
            console.debug(chats);
            if(chats){
                io.emit('chat',chats);
            }
         });
    })
    
    
    socket.on('products', data => {
        productsApi.add(data).then(() => {
            productsApi.getAll().then((rows) => {
                let products = JSON.parse(JSON.stringify(rows));
                io.emit('history',products);
             });
        });
    })

    socket.on('message', data => {
        chatApi.add(data).then(() => {
            io.emit('chat',data);
        });
    })
});

app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
	res.render('home');
});


