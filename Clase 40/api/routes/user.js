import express from 'express';
import passport from 'passport';
import UserController from '../controller/userController.js';
import { signupMail } from '../../services/comunication/sendMail.js';
import logger from '../../services/logger/logger.js';

const userRouter = express.Router();
// signup
userRouter.post('/',passport.authenticate('register', { failureRedirect: '/failureRegister'}), (req, res) => {
	signupMail(req,res).then( () =>
		res.redirect('/dashboard')
	).catch(err => logger.error(`err ${err}`));
	
});

userRouter.get('/:email',UserController.get);

export default userRouter;
