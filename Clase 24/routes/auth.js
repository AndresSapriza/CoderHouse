import express from 'express';
import bycrypt from 'bcryptjs';
import sessionChecker from "../middleware/auth.js";
import User from '../models/user.js';

const authRouter = express.Router();

// Login
authRouter.post('/',sessionChecker, (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).send('Please enter all fields');
	}

	User.findOne({ username })
		.then((user) => {
			if (!user) return res.status(400).send('User does not exist');

			bycrypt.compare(password, user.password)
				.then((isMatch) => {
					if (!isMatch) return res.status(400).send('Invalid credentials');
					req.session.user = user;
                    res.redirect('/dashboard');
				});
		});
});


export default authRouter;
