import express from 'express';
import sessionChecker from "../middleware/auth.js";
import dotenv from 'dotenv';


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
viewRouter.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(process.env.dirname+'/public/dashboard.html');
    }else{
        res.redirect('/login');
    }
});

viewRouter.get('/logout', (req, res) => {
    res.clearCookie('user_sid');
    req.session.save(function (err) {
        if (err) next(err)
    
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
          if (err) next(err)
          res.redirect('/')
        })
      })
});

export default viewRouter;
