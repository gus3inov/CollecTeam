import * as passport from 'koa-passport';
import * as LocalPassport from 'passport-local';
import User from '../models/User';
import {compareSync} from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const LocalStrategy = LocalPassport.Strategy;
const user = new User();
const jwtSecret: string = config.get('jwtSecret');

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    return user.findByUserName(username)
        .then((user) => {
            done(null, user[0]);
        })
        .catch((err) => {
            done(err, null);
        });
});

passport.use(new LocalStrategy(
    function (username: string, password: string, done: any) {
        user.findByUserName(username).then(userRes => {
            const userData = userRes[0];

            if (!userData) {
                return done(null, false)
            }
            if (!compareSync(password, userData.password)) {
                return done(null, false)
            }

            const payload = {
                sub: userData.id
            };
            const token = jwt.sign(payload, jwtSecret, {expiresIn: 604800});

            return done(null, token, userData)
        })
            .catch(err => {
                return done(err)
            })
    }
));
