import * as Passport from 'passport'

const passportInit = (app: any) =>  {
    app.use(Passport.initialize());
    app.use(Passport.session());
};

export default passportInit;