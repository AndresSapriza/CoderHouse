import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from 'passport';
import MongoStore from 'connect-mongo';
import startDb from './db/mongodb.js';
import { initializePassport } from './middleware/passport.config.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import viewRouter from './routes/views.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/carts.js';
import logger from './logger/logger.js';

const __filename = fileURLToPath(import.meta.url);
process.env.dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

startDb();
const mongoUri = process.env.MONGOURI || 'mongodb://localhost:27017';
const uri = `${mongoUri}/${process.env.DBNAME}?retryWrites=true&w=majority`;



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: uri,
        autoRemove: 'native', // Default
        touchAfter: 3 * 60,
        ttl: 10 * 60 // time period in seconds
    })
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/',express.static('public'));


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.set('views','./views');
app.set('view engine','ejs');

app.use((req, res, next)=> {
    logger.info(`route-${req.path}`);
    next();
});

app.use((req, res) => {
    logger.warn({error: -2, descripcion: `route ${req.baseUrl}${req.url} method ${req.method} doesn't exist!`});
    res.status(404).send({error: -2, descripcion: `route ${req.baseUrl}${req.url} method ${req.method} doesn't exist!`});
});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});