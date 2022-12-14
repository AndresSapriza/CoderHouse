import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

// Login
authRouter.post('/',passport.authenticate('login', { failureRedirect: '/failureLogin'}), (req, res) => {
	res.redirect('/dashboard');
});



export default authRouter;
