import express from 'express';
import {sessionChecker, sessionCheckerStay} from "../middleware/auth.js";
import core from 'os';


const viewRouter = express.Router();

// Login
viewRouter.get('/login',sessionChecker, (req, res) => {
	res.sendFile(process.env.dirname + '/public/login.html');
});

viewRouter.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});

// Sign up
viewRouter.get('/signup',sessionChecker, (req, res) => {
    res.sendFile(process.env.dirname + '/public/signup.html');
});

// dashboard
viewRouter.get('/dashboard',sessionCheckerStay, (req, res) => {
    // res.sendFile(process.env.dirname+'/public/dashboard.html');
    res.render('home');
});

viewRouter.get('/failureRegister', (req, res) => {
    res.redirect('/signup');
})

viewRouter.get('/failureLogin', (req, res) => {
    res.redirect('/login');
})

viewRouter.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
  });

export default viewRouter;
