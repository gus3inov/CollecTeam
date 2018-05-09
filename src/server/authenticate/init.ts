import * as passport from 'koa-passport';
import * as LocalPassport from 'passport-local';
import User from '../models/User';
import authenticationMiddleware from './middleware';
import { compareSync } from 'bcryptjs';

const LocalStrategy = LocalPassport.Strategy;
const user = new User();

passport.serializeUser((user, done) => { done(null, user.username); });

passport.deserializeUser((username, done) => {
    return user.findByUserName(username)
        .then((user) => { done(null, user[0]); })
        .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy(
    function(username: string, password: string, done: any) {
        user.findByUserName(username).then(userRes => {
            const userData = userRes[0];

            if (!userData) {
                return done(null, false)
            }
            if (!compareSync(password, userData.password)) {
                return done(null, false)
            }
            return done(null, userData)
        })
            .catch(err => {
                return done(err)
            })
    }
))
