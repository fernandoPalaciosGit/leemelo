module.exports = function (req, res, next) {
    res.locals.user = 'nando';
    // res.locals.authenticated = !req.user.anonymous;
    next();
};