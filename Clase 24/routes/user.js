import express from 'express';
import bycrypt from 'bcryptjs';
import User from '../models/user.js';

const userRouter = express.Router();
// signup
userRouter.post('/', (req, res) => {
	const { username, email, password } = req.body;
	
	if (!username || !email || !password) {
		return res.status(400).send('Please enter all fields');
	}

	User.findOne({ username })
		.then((user) => {
			if (user) return res.status(400).send('User already exists');

			bycrypt.genSalt(10, (err, salt) => {
				bycrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					User.create({
						username,
						email,
						password:hash,
					}).then((newUser) => {
						req.session.user = newUser;
                    	res.redirect('/dashboard');
					});
				});
			});
		});
});

export default userRouter;
