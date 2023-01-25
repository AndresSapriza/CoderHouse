import passport from 'passport';
import local from 'passport-local';
import User from '../models/userModel.js';
import bycrypt from 'bcryptjs';
import logger from '../logger/logger.js'

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy({ usernameField: 'email',passwordField: 'password',passReqToCallback: true },
            async (req, email, password, done) => {
                
                try {
                    let user = await User.findOne({ email: email });
                    if (user) return done(null, false);
                    bycrypt.genSalt(10, (err, salt) => {
                        bycrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            User.create({
                                name: req.body.name,
                                address: req.body.address,
                                age: req.body.age,
                                phone: req.body.phone,
                                avatar: req.body.avatar,
                                email,
                                password:hash,
                            }).then((newUser) => {
                                return done(null, newUser);
                            }).catch((err) => {
                                logger.error(`register: ${err}`);
                                done(err);
                            });
                        });
                    });
                } catch(err) {
                    logger.error(`register: ${err}`);
                    done(err);
                }
            }
        )
    )


    passport.use(
        'login',
        new LocalStrategy( { usernameField: 'email',passwordField: 'password' },async(email, password, done) => {
                try {
                    let user = await User.findOne({ email: email });
                    if (!user){
                        return done(null, false);
                    } 
                    bycrypt.compare(password, user.password)
                        .then((isMatch) => {
                            if (!isMatch){
                                return done(null, false);
                            }
                            return done(null, user);
                        });
                } catch(err) {
                    return done(err);
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, done)
    })

}