import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import session from "express-session";
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import viewRouter from './routes/views.js';
import path from 'path';
import {fileURLToPath} from 'url';
import MongoStore from 'connect-mongo';
import { initializePassport } from './middleware/passport.config.js';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);

process.env.dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

const mongoUri = process.env.MONGOURI || 'mongodb://localhost:27017';
    const uri = `${mongoUri}/${process.env.DBNAME}?retryWrites=true&w=majority`
    mongoose.connect(uri,{
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
    .then(() => console.log(" Mongoose is connected"))
	.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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


app.use((req, res) => {
    res.status(404).send({error: -2, descripcion: `route ${req.baseUrl}${req.url} method ${req.method} doesn't exist!`});
});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});