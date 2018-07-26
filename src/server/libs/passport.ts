import * as passport from 'koa-passport';

const passportInit = (app: any) =>  {
    app.use(passport.initialize());
    app.use(passport.session());
};

export default passportInit;
