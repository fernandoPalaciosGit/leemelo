module.exports = function (req, res, next) {
    res.locals.user = 'nando';
    res.locals.environment = JSON.stringify(process.env);
    next();
};