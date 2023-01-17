import passport from 'passport';
import local from 'passport-local';
import User from '../models/user.js';
import bycrypt from 'bcryptjs';
import logger from '../utils/logger.js';

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                try {
                    let user = await User.findOne({ username: username });
                    if (user) return done(null, false);
                    bycrypt.genSalt(10, (err, salt) => {
                        bycrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            User.create({
                                username,
                                email: req.body.email,
                                password:hash,
                            }).then((newUser) => {
                                return done(null, newUser);
                            }).catch((err) => {
                                logger.error(`error: ${err}`)
                                done(err);
                            });
                        });
                    });
                } catch(err) {
                    done(err);
                }
            }
        )
    )


    passport.use(
        'login',
        new LocalStrategy(
            async(username, password, done) => {
                try {
                    let user = await User.findOne({ username: username });
                    if (!user){
                        logger.error(`${username} doesn't exist`)
                        return done(null, false);
                    } 
                    bycrypt.compare(password, user.password)
                        .then((isMatch) => {
                            if (!isMatch){
                                logger.error(`password incorrect for following user ${user.username} `)
                                return done(null, false);
                            }
                            return done(null, user);
                        });
                } catch(err) {
                    logger.error(`error: ${err}`)
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