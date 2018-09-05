import User from '@server/modules/user/UserModel';
import * as passport from 'koa-passport';
import * as LocalPassport from 'passport-local';
import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const LocalStrategy = LocalPassport.Strategy;
const userModel: IUserModel = new User();
const jwtSecret: string = config.get('jwtSecret');

passport.serializeUser((user: IUser, done) => {
	done(null, user.username);
});

passport.deserializeUser((username: string, done) => {
	return userModel.findByUserName(username)
		.then((user) => {
			done(null, user[0]);
		})
		.catch((err) => {
			done(err, {});
		});
});

passport.use(new LocalStrategy(
	(username: string, password: string, done: any) => {
		userModel.findByUserName(username).then(userRes => {
			const userData = userRes[0];

			if (!userData || !compareSync(password, userData.password)) {
				return done(null, false);
			}

			const payload = {
				sub: userData.id,
			};
			const token = jwt.sign(payload, jwtSecret, {expiresIn: 604800});

			return done(null, token, userData);
		})
			.catch(err => {
				return done(err);
			});
	}
));
