import express from 'express';
import passport from 'passport';

const userRouter = express.Router();
// signup
userRouter.post('/',passport.authenticate('register', { failureRedirect: '/failureRegister'}), (req, res) => {
	res.redirect('/dashboard');
});

export default userRouter;
