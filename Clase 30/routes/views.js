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
    res.sendFile(process.env.dirname+'/public/dashboard.html');
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

viewRouter.get('/info',sessionCheckerStay, (req, res) => {

    const html = `<ul>
    <li>Args: ${process.argv.slice(2)}</li>
    <li>SO: ${process.platform}</li>
    <li>Version: ${process.version}</li>
    <li>Memoria: ${process.memoryUsage().rss}</li>
    <li>Path: ${process.argv[0]}</li>
    <li>Process id: ${process.pid}</li>
    <li>'Quantity of cpus': ${core.cpus().length}</li>
    <li>Proyecto: ${process.argv[1]}</li>
 </ul>`;
    res.send(html);
})

export default viewRouter;
