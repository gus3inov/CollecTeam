const authenticationMiddleware = () => {
    return function (ctx, next) {
        if (ctx.req.isAuthenticated()) {
            return next()
        }
        ctx.res.redirect('/')
    }
}

export default authenticationMiddleware;