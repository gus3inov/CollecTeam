import * as passport from 'passport';
import * as LocalPassport from 'passport-local';
import User from '../models/User';
import authenticationMiddleware from './middleware'

const LocalStrategy = LocalPassport.Strategy;
const user = new User();

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
    return user.findIndentity(id)
        .then((user) => { done(null, user); })
        .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy(
    function(username: string, password: string, done: any) {
        user.findByUserName(username).then(user => {
            if (!user) {
                return done(null, false)
            }
            if (password !== user.password ) {
                return done(null, false)
            }
            return done(null, user)
        })
            .catch(err => {
                return done(err)
            })
    }
))
